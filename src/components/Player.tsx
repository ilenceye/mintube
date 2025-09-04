import { useSettingsStore } from "@/hooks/useSettings";
import YouTube from "react-youtube";

type PlayerProps = {
  videoId: string;
  onEnd: () => void;
};

export function Player({ videoId, onEnd }: PlayerProps) {
  const autoplay = useSettingsStore((s) => s.autoplay);

  return (
    <YouTube
      videoId={videoId}
      className="p-4"
      iframeClassName="aspect-video w-full rounded"
      opts={{
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          rel: 0,
        },
      }}
      onEnd={onEnd}
    />
  );
}
