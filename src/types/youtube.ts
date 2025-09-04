import type { DeepPrettify } from "@/types/helper";
import { youtube_v3 } from "@googleapis/youtube";

export type YTPlaylistItemsResponse =
  DeepPrettify<youtube_v3.Schema$PlaylistItemListResponse>;

export type YTPlaylistItem = DeepPrettify<youtube_v3.Schema$PlaylistItem>;

export type YTPlaylistListResponse =
  DeepPrettify<youtube_v3.Schema$PlaylistListResponse>;

export type YTPlaylist = DeepPrettify<youtube_v3.Schema$Playlist>;

export type YTChannelResponse =
  DeepPrettify<youtube_v3.Schema$ChannelListResponse>;

export type YTThumbnailDetails =
  DeepPrettify<youtube_v3.Schema$ThumbnailDetails>;

export type YTVideoListResponse =
  DeepPrettify<youtube_v3.Schema$VideoListResponse>;
