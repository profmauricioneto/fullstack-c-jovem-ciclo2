import React from "react";
import Column from "./components/Column";
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";

export default function App() {
  return (
    <>
      <Header />
      <SubHeader />
      <div className="flex">
        <Column titleColumn="O que foi bom?" />
        <Column titleColumn="O que foi ruim?" />
        <Column titleColumn="O que pode melhorar?" />
      </div>
    </>
  );
}
