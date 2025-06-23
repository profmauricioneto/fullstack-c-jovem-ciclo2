import React from 'react';

const ColumnArea = (props) => {
    return (
        <div className="h-screen w-1/6 bg-white shadow-lg p-6 border border-gray-200 rounded-xl flex flex-col items-center mx-2">
            <h2 className="text-center mb-4 text-xl font-bold text-gray-700 border-b-2 border-blue-200 w-full pb-2">
                {props.titleColumn}
            </h2>
            <div className="flex-1 w-full flex flex-col gap-2">
                {/* Aqui você pode renderizar cards ou itens da coluna */}
            </div>
            <button
                className="w-full mt-4 border-0 rounded-lg bg-blue-500 text-white font-semibold py-2 hover:bg-blue-600 transition-colors shadow"
                title="Adicionar item"
            >
                +
            </button>
        </div>
    );
};

export default ColumnArea;