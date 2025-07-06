import React from 'react';

const Card = ({ id, text, onEdit, onDelete }) => {
    return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <p className="text-gray-800 text-sm flex-1 mr-2">
                    {text}
                </p>
                <div className="flex gap-1">
                    <button
                        onClick={() => onEdit(id)}
                        className="text-blue-500 hover:text-blue-700 text-xs font-medium"
                        title="Editar"
                    >
                        ✏️
                    </button>
                    <button
                        onClick={() => onDelete(id)}
                        className="text-red-500 hover:text-red-700 text-xs font-medium"
                        title="Excluir"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
