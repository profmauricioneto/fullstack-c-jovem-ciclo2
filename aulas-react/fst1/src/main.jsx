import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import AppLogin from "../exercicio02/AppLogin";
import { BrowserRouter } from "react-router-dom";
import CounterZustand from "./components/CounterZustand";
// import ListaTarefas from "./components/ListaTarefas";
// import GetApiPosts from "./components/GetApiPosts";
// import TestUseEffect from "./components/TestUseEffect";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* <AppLogin /> */}
      {/* <TestUseEffect /> */}
      {/* <GetApiPosts /> */}
      {/* <ListaTarefas /> */}
      <CounterZustand />
    </BrowserRouter>
  </StrictMode>
);
