import { create } from 'zustand';

export const useStore = create((set) => ({
    store: 'start',
    action: () => set({store: 'currentStore'}),
}));