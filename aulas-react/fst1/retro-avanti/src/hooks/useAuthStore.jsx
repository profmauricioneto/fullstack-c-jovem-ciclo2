import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    isAuthorizated: false,
    user: null,
    login: (userData) => set({isAuthorizated: true, user: userData}),
    logout: () => set({isAuthorizated: false, user: null}),
}));