import { useRef } from "react";

type TextFilePickerProps = {
  children?: React.ReactNode;
  accept: string[];
  className?: string;
  id?: string;
  onUpload?: (value: string) => void;
};

export function TextFilePicker({
  children = "Import",
  className,
  accept,
  id = "text-file-picker",
  onUpload,
}: TextFilePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsText(file);
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        onUpload?.(reader.result);
      }
    });
  };

  return (
    <label
      className={className}
      htmlFor={id}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
    >
      {children}
      <input
        style={{ display: "none" }}
        id={id}
        type="file"
        accept={accept.join(",")}
        ref={inputRef}
        onChange={handleChange}
      />
    </label>
  );
}
