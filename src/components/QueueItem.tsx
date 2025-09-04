import { cn } from "@/lib/classnames";
import type { PlaylistItem } from "@/types/db";

type QueueItemProps = {
  item: PlaylistItem & {
    index: number;
    isActive: boolean;
  };
  onClick: () => void;
};

export function QueueItem({ item, onClick }: QueueItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex cursor-pointer items-center gap-4 rounded px-3 py-2 transition-colors duration-150",
        item.isActive
          ? "bg-primary/10 text-primary font-semibold"
          : "hover:text-primary hover:bg-gray-100",
      )}
    >
      <div>{item.index}</div>
      <div className="truncate">{item.title}</div>
      <div className="text-muted-foreground ml-auto text-sm">
        {item.duration}
      </div>
    </div>
  );
}
