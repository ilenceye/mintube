import { useQueueStore } from "@/hooks/useQueue";
import { useNavigate } from "react-router";

export function ClearData() {
  const clear = useQueueStore((s) => s.clear);
  const navigate = useNavigate();

  return (
    <button
      className="hover:bg-sidebar-accent w-full cursor-pointer px-4 py-2 text-left"
      onClick={async () => {
        await clear();
        navigate("/", { replace: true });
      }}
    >
      清空数据
    </button>
  );
}
