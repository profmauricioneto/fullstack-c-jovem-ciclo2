import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    isAuthorizated: false,
    user: null, // {email: email, password: password}
    login: (userData) => set({isAuthorizated: true, user: userData}),
    logout: () => set({isAuthorizated: false, user: null}),
}));