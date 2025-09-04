import { useQueueStore } from "@/hooks/useQueue";
import { Navigate } from "react-router";

export function Home() {
  const currentQueue = useQueueStore((s) => s.currentQueue);

  if (currentQueue) {
    return <Navigate to={`/${currentQueue.id}`} replace />;
  }

  return (
    <div className="grid h-full place-content-center text-5xl">MinTube</div>
  );
}
