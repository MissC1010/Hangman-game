import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = document.getElementById("root");
const app = <App />;

createRoot(root).render(app);
