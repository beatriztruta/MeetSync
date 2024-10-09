import React from "react";
import ReactDOM from "react-dom/client";
import RoutesApp from "./routes";

import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RoutesApp />
  </React.StrictMode>
);