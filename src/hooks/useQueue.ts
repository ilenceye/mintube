import { db } from "@/lib/idb";
import type { Playlist } from "@/types/db";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CurrentQueue = {
  id: string;
  title: string;
};

type QueueStore = {
  queues: Playlist[];
  getQueues: () => Promise<void>;
  createQueue: (queue: Playlist) => Promise<void>;
  createQueues: (queues: Playlist[]) => Promise<void>;
  currentQueue: CurrentQueue | null;
  setCurrentQueue: (queue: CurrentQueue) => void;
  clear: () => Promise<void>;
};

export const useQueueStore = create<QueueStore>()(
  persist(
    (set, get) => ({
      queues: [],
      getQueues: async () => {
        const data = await db.getQueues();
        set({ queues: data });
      },
      createQueue: async (queue) => {
        const exists = get().queues.some((q) => q.id === queue.id);
        if (!exists) {
          await db.createQueue(queue);
          set({ queues: [...get().queues, queue] });
        } else {
          console.log(`Queue with id ${queue.id} already exists`);
        }
      },
      createQueues: async (newQueues) => {
        const { queues } = get();

        // 过滤掉已存在的
        const unique = newQueues.filter(
          (q) => !queues.some((existing) => existing.id === q.id),
        );

        if (unique.length === 0) return;

        // 存到数据库
        for (const q of unique) {
          await db.createQueue(q);
        }

        // 更新 store
        set({ queues: [...queues, ...unique] });
      },
      currentQueue: null,
      setCurrentQueue: (queue) => set({ currentQueue: queue }),
      clear: async () => {
        await db.clear();
        set({ currentQueue: null, queues: [] });
      },
    }),
    {
      name: "queue-store",
      partialize: (state) => ({ currentQueue: state.currentQueue }),
    },
  ),
);
