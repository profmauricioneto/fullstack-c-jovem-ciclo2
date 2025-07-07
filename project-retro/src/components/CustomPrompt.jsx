import React, { useState, useEffect } from 'react';

const CustomPrompt = ({ isOpen, onClose, onConfirm, title, placeholder, defaultValue = '' }) => {
    const [inputValue, setInputValue] = useState(defaultValue);

    useEffect(() => {
        setInputValue(defaultValue);
    }, [defaultValue, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onConfirm(inputValue.trim());
            setInputValue('');
        }
    };

    const handleCancel = () => {
        onClose();
        setInputValue('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-md mx-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {title}
                </h3>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={placeholder}
                        className="w-full p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        rows={4}
                        autoFocus
                    />
                    <div className="flex gap-3 mt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={!inputValue.trim()}
                            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomPrompt;
