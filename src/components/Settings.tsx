import { AutoplaySwitcher } from "@/components/AutoplaySwitcher";
import { ClearData } from "@/components/ClearData";
import { ExportData } from "@/components/ExportData";
import { ImportData } from "@/components/ImportData";

export function Settings() {
  return (
    <div>
      <AutoplaySwitcher />
      <ExportData />
      <ImportData />
      <ClearData />
    </div>
  );
}
