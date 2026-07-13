import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#1A1A2E",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            padding: "14px 20px",
            fontSize: "0.9rem",
            fontFamily: "Inter, sans-serif",
          },
          success: { className: "toast-success" },
          error: { className: "toast-error" },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
