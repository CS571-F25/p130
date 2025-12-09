// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App.jsx";

const container = document.getElementById("root");

createRoot(container).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
