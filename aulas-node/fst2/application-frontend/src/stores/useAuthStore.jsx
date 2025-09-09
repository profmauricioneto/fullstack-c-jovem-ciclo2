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

            initialize: () => {
                const { token } = get()
                if ( token ) {
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                }
            },

            register: async (nome, email, senha) => {
                set({ isLoading: true, error: null })
                try {
                    const response = await api.post('/auth/register', {nome, email, senha})
                    const { user, token } = response.data
                    
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                    set({
                        user,
                        token,
                        isLoading: false,
                        error: null,
                    })

                    return {success: true, user}
                } catch (error) {
                    const errorMessage = error.message?.data?.error || 'error ao cadastrar o usuário'
                    set({
                        isLoading: false,
                        error: errorMessage,
                        token: null,
                        user: null,
                    })
                    return {success: false, error: errorMessage}
                } 
            },

            logout: () => {
                delete api.defaults.headers.common['Authorization']
                set({
                    user: null,
                    token: null,
                    error: null,
                })
            },

            login: async (email, senha) => {
                set({ isLoading: true, error: null })

                try {
                    const response = await api.post('/auth/login', {email, senha})
                    const { user, token } = response.data

                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                    set({
                        user,
                        token,
                        isLoading: false,
                        error: null,
                    })

                    return { success: true, user}
                } catch (error) {
                    const errorMessage = error.message?.data?.error || 'error ao cadastrar o usuário'
                    set({
                        isLoading: false,
                        error: errorMessage,
                        token: null,
                        user: null,
                    })
                    return {success: false, error: errorMessage}                    
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