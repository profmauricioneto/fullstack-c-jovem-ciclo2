import React from "react";
import Card from "./Card";

const ColumnArea = (props) => {
  return (
    <div className="h-screen w-1/4 bg-white shadow-lg p-6 border border-gray-200 rounded-xl flex flex-col items-center mx-2">
      <h2 className="text-center mb-4 text-xl font-bold text-gray-700 border-b-2 border-blue-200 w-full pb-2">
        {props.titleColumn}
      </h2>
      <div className="flex-1 w-full flex flex-col gap-2 overflow-y-auto">
        <button
          onClick={props.onAddCard}
          className="w-full mt-2 border-0 rounded-lg bg-blue-500 text-white font-semibold py-0.5 hover:bg-blue-600 transition-colors shadow"
          title="Adicionar item"
        >
          +
        </button>
        {props.cards &&
          props.cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              text={card.text}
              onEdit={props.onEditCard}
              onDelete={props.onDeleteCard}
            />
          ))}
      </div>
    </div>
  );
};

export default ColumnArea;
