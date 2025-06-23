import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RouterPages from "./components/RouterPages";


createRoot(document.getElementById("root")).render(
  <StrictMode>
      <RouterPages/>
  </StrictMode>
);
