import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App.jsx";
import { routes } from "./routes.jsx";

import "./index.css";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(routes);
ReactDOM.hydrateRoot(
  document.getElementById("root"),
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
    <Toaster position="top-center" />
  </React.StrictMode>,
);
