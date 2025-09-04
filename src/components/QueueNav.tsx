import { useEffect } from "react";

import { ClearQueue } from "@/components/ClearQueue";
import { useQueueStore } from "@/hooks/useQueue";
import { cn } from "@/lib/classnames";
import { NavLink } from "react-router";

export function QueueNav() {
  const queues = useQueueStore((s) => s.queues);
  const getQueues = useQueueStore((s) => s.getQueues);

  useEffect(() => {
    getQueues();
  }, [getQueues]);

  return (
    <>
      {queues.map((queue) => (
        <NavLink
          key={queue.id}
          to={`/${queue.id}`}
          className={({ isActive }) =>
            cn(
              "group text-primary/80 flex items-center justify-between gap-4 rounded px-4 py-2 transition-colors duration-150",
              isActive
                ? "bg-sidebar-accent text-primary"
                : "hover:text-primary hover:bg-gray-100",
            )
          }
          state={{ title: queue.title }}
        >
          <span className="block max-w-xs truncate">{queue.title}</span>
          <ClearQueue id={queue.id} />
        </NavLink>
      ))}
    </>
  );
}
