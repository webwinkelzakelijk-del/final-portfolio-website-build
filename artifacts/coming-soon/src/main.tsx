import { createRoot } from "react-dom/client";

import App from "./App";
import ContactPage from "./ContactPage";
import WorkPage from "./WorkPage";
import { ErrorBoundary } from "@/components/error-boundary";

import "./index.css";

const isWorkPage = window.location.pathname
  .replace(/\/+$/, "")
  .endsWith("/werk");
const isContactPage = window.location.pathname
  .replace(/\/+$/, "")
  .endsWith("/contact");

createRoot(document.getElementById("root")!, {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <ErrorBoundary>
    {isContactPage ? <ContactPage /> : isWorkPage ? <WorkPage /> : <App />}
  </ErrorBoundary>,
);
