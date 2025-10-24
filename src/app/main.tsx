import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ReduxProvider } from "./providers/ReduxProvider.tsx";
import "./style/index.css";

createRoot(document.getElementById("root")!).render(
  <ReduxProvider>
    <App />
  </ReduxProvider>,
);
