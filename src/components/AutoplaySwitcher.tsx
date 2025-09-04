import { useSettingsStore } from "@/hooks/useSettings";

export function AutoplaySwitcher() {
  const autoplay = useSettingsStore((s) => s.autoplay);
  const toggleAutoplay = useSettingsStore((s) => s.toggleAutoplay);

  return (
    <label className="hover:bg-sidebar-accent flex cursor-pointer items-center gap-2 px-4 py-2 select-none">
      <input
        type="checkbox"
        checked={autoplay}
        onChange={toggleAutoplay}
        className="accent-blue-500"
      />
      允许自动播放
    </label>
  );
}
