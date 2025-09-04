import { CreateQueue } from "@/components/CreateQueue";
import { QueueNav } from "@/components/QueueNav";
import { Settings } from "@/components/Settings";
import { Outlet } from "react-router";

export function Root() {
  return (
    <div className="bg-sidebar flex h-screen items-center justify-center">
      <div className="flex h-full w-full max-w-5xl overflow-hidden bg-white shadow-lg">
        <aside className="bg-sidebar w-64 flex-shrink-0 border-r">
          <div className="flex h-full flex-col">
            <div className="border-b p-4">
              <CreateQueue />
            </div>
            <div className="grow overflow-auto p-4">
              <QueueNav />
            </div>
            <div className="border-t p-4">
              <Settings />
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
