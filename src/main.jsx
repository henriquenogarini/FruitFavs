import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { FavoriteProvider } from "./contexts/FavoriteContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FavoriteProvider>
      <App />
    </FavoriteProvider>
  </React.StrictMode>
);
