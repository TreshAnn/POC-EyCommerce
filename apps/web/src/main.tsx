import "./styles/index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { RootView } from "./views/RootView";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RootView />
  </React.StrictMode>,
);
