import { create } from 'zustand';

export const useStore = create((set) => ({
    state: 'started',
    action: () => set({state: 'current state'}),
    actionTwo: () => set({state: 'another state'})
}));