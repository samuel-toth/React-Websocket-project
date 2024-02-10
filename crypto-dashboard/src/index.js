import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DashboardProvider } from "./contexts/DashboardContext";
import { CryptoDataProvider } from "./contexts/CryptoDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DashboardProvider>
      <CryptoDataProvider>
        <App />
      </CryptoDataProvider>
    </DashboardProvider>
  </React.StrictMode>
);
