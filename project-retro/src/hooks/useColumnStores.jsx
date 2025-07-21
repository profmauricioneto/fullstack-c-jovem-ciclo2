import { create } from 'zustand';

export const useColumnStore = create((set) => ({
    columns: [],
    cards: {}, // Objeto para armazenar cards por coluna: { columnId: [cards] }
    
    addColumn: (title) => set((state) => ({
        columns: [...state.columns, title]
    })),
    
    addCard: (columnIndex, text) => set((state) => {
        const cardId = Date.now().toString();
        const newCard = { id: cardId, text };
        return {
            cards: {
                ...state.cards,
                [columnIndex]: [...(state.cards[columnIndex] || []), newCard]
            }
        };
    }),
    
    editCard: (columnIndex, cardId, newText) => set((state) => ({
        cards: {
            ...state.cards,
            [columnIndex]: state.cards[columnIndex]?.map(card =>
                card.id === cardId ? { ...card, text: newText } : card
            ) || []
        }
    })),
    
    deleteCard: (columnIndex, cardId) => set((state) => ({
        cards: {
            ...state.cards,
            [columnIndex]: state.cards[columnIndex]?.filter(card => card.id !== cardId) || []
        }
    }))
}));