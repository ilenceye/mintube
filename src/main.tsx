import { router } from "@/routes.tsx";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
