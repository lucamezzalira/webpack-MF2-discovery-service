import React from "react";
import { createRoot } from "react-dom/client";
import MyAccount from "./MyAccount";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <MyAccount />
  </React.StrictMode>
);
