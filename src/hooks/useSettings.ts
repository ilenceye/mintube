import { create } from "zustand";
import { persist } from "zustand/middleware";

type SettingsStore = {
  autoplay: boolean;
  toggleAutoplay: () => void;
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      autoplay: false,
      toggleAutoplay: () => set({ autoplay: !get().autoplay }),
    }),
    {
      name: "settings-store",
    },
  ),
);
