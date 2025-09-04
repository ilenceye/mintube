import { TextFilePicker } from "@/components/ui/TextFilePicker";
import { useQueueStore } from "@/hooks/useQueue";
import type { Playlist } from "@/types/db";

export function ImportData() {
  const createQueues = useQueueStore((s) => s.createQueues);

  const handleUpload = async (value: string) => {
    const data = JSON.parse(value) as { queues?: Playlist[] } | null;

    if (data && data.queues) {
      await createQueues(data.queues);
      setTimeout(() => {
        alert("Importting Successfully.");
      }, 150);
    }
  };

  return (
    <TextFilePicker
      className="hover:bg-sidebar-accent block w-full cursor-pointer px-4 py-2"
      accept={[".json"]}
      onUpload={handleUpload}
    >
      导入数据
    </TextFilePicker>
  );
}
