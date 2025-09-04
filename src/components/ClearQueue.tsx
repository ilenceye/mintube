import { useQueueStore } from "@/hooks/useQueue";
import { useNavigate } from "react-router";

export function ClearQueue({ id }: { id: string }) {
  const navigate = useNavigate();

  const deleteQueue = useQueueStore((s) => s.deleteQueue);
  const currentQueue = useQueueStore((s) => s.currentQueue);
  const isEqual = id === currentQueue?.id;

  return (
    <span
      className="hover:bg-primary/5 hidden size-6 shrink-0 cursor-pointer items-center justify-center rounded group-hover:flex"
      onClick={async (e) => {
        e.preventDefault();
        await deleteQueue(id);
        if (isEqual) {
          navigate("/", { replace: true });
        }
      }}
    >
      x
    </span>
  );
}
