import { create } from 'zustand';
import { persist } from 'zustand/middleware'
import api from '../services/api'

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isLoading: false,
            error: null,

            isAuthenticated: () => get().token,

            setLoading: (loading) => set({ isLoading: loading}),
            setError: (error) => set({ error }),
            clearError: () => set({ error: null }),

            register: async (nome, email, senha) => {
                set({ isLoading: true, error: null })
                try {
                    const response = await api.post('/auth/register', {nome, email, senha})
                    const { user, token } = response.data
                } catch (error) {
                    return; // TIRAR ISSO DAQUI NA PROXIMA AULA
                } 
            }
        })
        ,{
            name: 'auth-store',
            partialize: (state) => ({
                user: state.user,
                token: state.token
            })

        }
    )
)

export default useAuthStore;