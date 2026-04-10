
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/alarm-sw.js").catch(() => {
        // Continue app startup even if service worker registration fails.
      });
    });
  }

  createRoot(document.getElementById("root")!).render(<App />);
  