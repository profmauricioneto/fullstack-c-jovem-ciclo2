import React from "react";
import Header from "./Header";
import SubHeader from "./SubHeader";
import Column from "./Column";
import { useColumnStore } from "../hooks/useColumnStore";

export default function RetroPage() {
  const columns = useColumnStore((state) => state.columns);

  return (
    <>
      <Header />
      <SubHeader />
      <div className="flex">
        {columns.map((title, index) => (
          <Column key={index} titleColumn={title} />
        ))}
      </div>
    </>
  );
}
