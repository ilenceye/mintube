import { useEffect, useState } from "react";

import { Player } from "@/components/Player";
import { QueueItem } from "@/components/QueueItem";
import { useQueueStore } from "@/hooks/useQueue";
import { getPlaylistItems } from "@/lib/youtube";
import type { PlaylistWithItems } from "@/types/db";
import { useParams } from "react-router";

export function QueuePage() {
  const params = useParams();
  const id = params.id as string;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [playlist, setPlaylist] = useState<PlaylistWithItems | null>(null);

  const currentQueue = useQueueStore((s) => s.currentQueue);
  const setCurrentQueue = useQueueStore((s) => s.setCurrentQueue);

  useEffect(() => {
    (async () => {
      const result = await getPlaylistItems(id);
      if (result) {
        setCurrentIndex(0);
        setPlaylist(result);
        setCurrentQueue({ id, title: result.items[0].title });
      }
    })();
  }, [id, setCurrentQueue]);

  if (!playlist) {
    return <p>Not found!</p>;
  }

  const playlistItems = playlist.items;

  return (
    <div className="mx-auto">
      <div className="bg-background sticky top-0">
        <div className="border-b p-4">
          <h2 className="truncate font-bold text-gray-900">
            {currentQueue?.title}
          </h2>
        </div>
        {playlistItems.length > 0 && (
          <Player
            videoId={playlistItems[currentIndex].videoId}
            onEnd={() => {
              if (currentIndex < playlistItems.length) {
                setCurrentIndex((prev) => prev + 1);
              }
            }}
          />
        )}
      </div>
      {playlistItems.length > 0 && (
        <div className="px-4">
          <div>{`${currentIndex + 1}/${playlist.totalResults}`}</div>
          <div className="my-4 overflow-y-auto">
            {playlistItems.map((item, index) => (
              <QueueItem
                key={item.id}
                item={{
                  ...item,
                  index: index + 1,
                  isActive: index === currentIndex,
                }}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
