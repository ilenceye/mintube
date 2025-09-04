import type { Playlist } from "@/types/db";
import type { YTPlaylist } from "@/types/youtube";
import localforage from "localforage";

const queuesStore = localforage.createInstance({
  name: "mintube",
  storeName: "queues",
});

const createQueue = async (queue: YTPlaylist) => {
  try {
    await queuesStore.setItem(queue.id!, queue);
  } catch (error) {
    console.error(error);
  }
};

const deleteQueue = async (id: string) => {
  try {
    await queuesStore.removeItem(id);
  } catch (error) {
    console.error(error);
  }
};

const getQueues = async () => {
  try {
    const keys = await queuesStore.keys();
    const queues = await Promise.all(
      keys.map((key) => queuesStore.getItem(key)),
    );
    return queues as Playlist[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const clear = async () => {
  await queuesStore.clear();
};

export const db = {
  createQueue,
  deleteQueue,
  getQueues,
  clear,
};
