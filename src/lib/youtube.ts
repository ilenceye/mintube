import { parseISODuration } from "@/lib/duration";
import type { Playlist, PlaylistWithItems } from "@/types/db";
import type {
  YTChannelResponse,
  YTPlaylistItemsResponse,
  YTPlaylistListResponse,
  YTVideoListResponse,
} from "@/types/youtube";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const getPlaylistItems = async (
  playlistId: string,
): Promise<PlaylistWithItems | null> => {
  const playlistItemsUrl = new URL(
    "https://www.googleapis.com/youtube/v3/playlistItems",
  );

  playlistItemsUrl.searchParams.set("part", "snippet");
  playlistItemsUrl.searchParams.set("playlistId", playlistId);
  playlistItemsUrl.searchParams.set("maxResults", "30");
  playlistItemsUrl.searchParams.set("key", API_KEY);

  const res = await fetch(playlistItemsUrl.toString());

  if (!res.ok) {
    throw new Error(`YouTube API error: ${res.status} ${res.statusText}`);
  }

  const data: YTPlaylistItemsResponse = await res.json();

  if (!data.items) {
    return null;
  }

  const videoIds = data.items.map(
    (item) => item.snippet?.resourceId?.videoId as string,
  );

  if (videoIds.length === 0)
    return {
      totalResults: 0,
      items: [],
    };

  const videosUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
  videosUrl.searchParams.set("part", "contentDetails");
  videosUrl.searchParams.set("id", videoIds.join(","));
  videosUrl.searchParams.set("key", API_KEY);

  const videosRes = await fetch(videosUrl.toString());
  if (!videosRes.ok)
    throw new Error(
      `YouTube API error: ${videosRes.status} ${videosRes.statusText}`,
    );

  const videosData: YTVideoListResponse = await videosRes.json();
  const durationMap = Object.fromEntries(
    videosData.items!.map((v) => [v.id, v.contentDetails!.duration]),
  );

  return {
    totalResults: data.pageInfo?.totalResults || 0,
    items: data.items.map((item) => {
      const videoId = item.snippet!.resourceId!.videoId!;
      return {
        id: item.id!,
        videoId,
        title: item.snippet?.title || "Untitled",
        duration: parseISODuration(durationMap[videoId]),
        thumbnails: item.snippet?.thumbnails,
        publishedAt: item.snippet!.publishedAt!,
      };
    }),
  };
};

export const getYTPlaylistById = async (
  id: string,
): Promise<Playlist | null> => {
  // 1️⃣ 尝试拿 playlist
  const playlistUrl = new URL(
    "https://www.googleapis.com/youtube/v3/playlists",
  );
  playlistUrl.searchParams.set("part", "snippet,contentDetails");
  playlistUrl.searchParams.set("id", id);
  playlistUrl.searchParams.set("key", API_KEY);

  const playlistRes = await fetch(playlistUrl.toString());
  if (!playlistRes.ok) {
    throw new Error(
      `YouTube API error (playlist): ${playlistRes.status} ${playlistRes.statusText}`,
    );
  }

  const playlistData: YTPlaylistListResponse = await playlistRes.json();
  if (playlistData.items && playlistData.items.length > 0) {
    const item = playlistData.items[0];
    return {
      id: item.id!,
      kind: "playlist",
      title: item.snippet?.title || "Untitled",
      thumbnails: item.snippet?.thumbnails,
      channelId: item.snippet!.channelId!,
    };
  }

  // 2️⃣ 尝试拿 channel
  const channelUrl = new URL("https://www.googleapis.com/youtube/v3/channels");
  channelUrl.searchParams.set("part", "snippet,contentDetails");
  channelUrl.searchParams.set("id", id);
  channelUrl.searchParams.set("key", API_KEY);

  const channelRes = await fetch(channelUrl.toString());
  if (!channelRes.ok) {
    throw new Error(
      `YouTube API error (channel): ${channelRes.status} ${channelRes.statusText}`,
    );
  }

  const channelData: YTChannelResponse = await channelRes.json();
  if (!channelData.items || channelData.items.length === 0) return null;

  const item = channelData.items[0];
  if (!item.contentDetails?.relatedPlaylists?.uploads) return null;

  return {
    id: item.contentDetails.relatedPlaylists.uploads, // uploadsPlaylistId
    kind: "channel",
    title: item.snippet!.title || "Untitled",
    thumbnails: item.snippet?.thumbnails,
    channelId: item.id!,
  };
};
