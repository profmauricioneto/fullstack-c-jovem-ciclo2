import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

const useAuthStore = create(
    persist(
        (set, get) => ({
            // states
            user: null,
            token: null,
            isLoading: false,
            error: null,

            // actions
            isAuthenticated: () => get().token || undefined,
            setLoading: () => set({ isLoading: true }),
            setError: (error) => set({ error }),
            clearError: () => set({ error: null }),

            register: async (nome, email, senha) => {
                set({ isLoading: true, error: null })

                try {
                    const response = await api.post('/auth/register', {nome, email, senha});
                    const  {user, token } = response.data;

                    // colocando token no cabecalho das requisicoes
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    // atualizando os estados dos objetos
                    set({
                        user,
                        token,
                        isLoading: false,
                        error: null
                    })

                    return { success: true, user}
                } catch (error) {
                    const errorMessage = error.response?.data?.error || 'erro ao cadastro'
                    set({
                        user: null,
                        token: null,
                        isLoading: false,
                        error: errorMessage,
                    })
                    return { success: false, error: errorMessage}
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
                set({ isLoading: true, error: null });

                try {
                    const response = await api.post('/auth/login', { email, senha });
                    const { user, token } = response.data;

                    // colocando token no cabecalho das requisicoes
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    // atualizando os estados dos objetos
                    set({
                        user,
                        token,
                        isLoading: false,
                        error: null
                    })

                    return { success: true, user}
                } catch (error) {
                    const errorMessage = error.response?.data?.error || 'erro ao fazer login'
                    set({
                        user: null,
                        token: null,
                        isLoading: false,
                        error: errorMessage,
                    })
                    return { success: false, error: errorMessage}
                }                
            },
            initialize: () => {
                const { token } = get()
                if (token) {
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }
            }
        })
        ,{
            name: 'auth-data-store',
            partialize: (state) => ({
                user: state.user,
                token: state.token,
            }),
        }
    )
)

export default useAuthStore;