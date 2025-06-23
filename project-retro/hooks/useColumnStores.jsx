import { create } from 'zustand';

export const useColumnStore = create((set) => ({
    columns: [],
    addColumn: (title) => set((state) => ({
        columns: [...state.columns, title]
    }))
}));