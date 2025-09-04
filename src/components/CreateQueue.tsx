import { Input } from "@/components/ui/input";
import { useQueueStore } from "@/hooks/useQueue";
import { getYTPlaylistById } from "@/lib/youtube";

export function CreateQueue() {
  const createQueue = useQueueStore((s) => s.createQueue);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    const id = data.get("id") as string;

    const result = await getYTPlaylistById(id);

    if (result) {
      await createQueue(result);
      formEl.reset();
    } else {
      alert("The playlist or channel does not exist.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        className="bg-white"
        name="id"
        placeholder="Type the playlist or channel ID"
      />
    </form>
  );
}
