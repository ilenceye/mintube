import type { YTThumbnailDetails } from "@/types/youtube";

export type Playlist = {
  id: string;
  kind: "playlist" | "channel";
  title: string;
  thumbnails?: YTThumbnailDetails;
  channelId: string;
};

export type PlaylistItem = {
  id: string;
  videoId: string;
  title: string;
  duration: string;
  thumbnails?: YTThumbnailDetails;
  publishedAt: string;
};

export type PlaylistWithItems = {
  totalResults: number;
  items: PlaylistItem[];
};
