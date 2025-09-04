import { Root } from "@/components/Root";
import { Home } from "@/page/Home";
import { QueuePage } from "@/page/QueuePage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/:id",
        Component: QueuePage,
      },
    ],
  },
]);
