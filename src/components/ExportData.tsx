import { useQueueStore } from "@/hooks/useQueue";
import { downloadFile } from "@/lib/dom";

export function ExportData() {
  const queues = useQueueStore((s) => s.queues);

  return (
    <button
      className="hover:bg-sidebar-accent w-full cursor-pointer px-4 py-2 text-left"
      onClick={() =>
        downloadFile({
          content: JSON.stringify({ queues }),
          filename: "mintube-backup.json",
          type: "application/json",
        })
      }
    >
      导出数据
    </button>
  );
}
