import React, { Fragment } from "react";
import { useColumnStore } from "../hooks/useColumnStore";
import Column from "./Column";
import Header from "./Header";
import SubHeader from "./SubHeader";

export default function RetroDevPage() {
  const columns = useColumnStore((state) => state.columns);

  return (
    <Fragment>
      <Header />
      <SubHeader />
      <div className="flex">
        {columns.map((title, index) => (
          <Column key={index} titleColumn={title} />
        ))}
      </div>
    </Fragment>
  );
}
