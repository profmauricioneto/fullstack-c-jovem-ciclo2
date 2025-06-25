import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Cadastro from "./components/Cadastro";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Cadastro />
  </StrictMode>
);
