import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../services/api'

const useAuthStore = create(
  persist(
    (set, get) => ({
      // Estado
      user: null,
      token: null,
      isLoading: false,
      error: null,
      
      // Getters computados
      isAuthenticated: () => !!get().token,
      
      // Actions
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      
      // Login
      login: async (email, senha) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await api.post('/auth/login', { email, password: senha })
          const { client, token } = response.data
          
          // Configurar header do axios
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          set({ 
            user: client, 
            token, 
            isLoading: false,
            error: null 
          })
          
          return { success: true, user: client }
        } catch (error) {
          const errorMessage = error.response?.data?.error || 'Erro no login'
          set({ 
            isLoading: false, 
            error: errorMessage,
            user: null,
            token: null 
          })
          return { success: false, error: errorMessage }
        }
      },
      
      // Registro
      register: async (nome, email, senha) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await api.post('/auth/register', { nome, email, senha })
          const { client, token } = response.data
          
          // Configurar header do axios
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          set({ 
            user: client, 
            token, 
            isLoading: false,
            error: null 
          })
          
          return { success: true, user: client }
        } catch (error) {
          const errorMessage = error.response?.data?.error || 'Erro no registro'
          set({ 
            isLoading: false, 
            error: errorMessage,
            user: null,
            token: null 
          })
          return { success: false, error: errorMessage }
        }
      },
      
      // Logout
      logout: () => {
        delete api.defaults.headers.common['Authorization']
        set({ 
          user: null, 
          token: null, 
          error: null 
        })
      },
      
      // Inicializar (configurar axios se já existir token)
      initialize: () => {
        const { token } = get()
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
      }
    }),
    {
      name: 'auth-storage', // nome da chave no localStorage
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token 
      }), // apenas persistir user e token
    }
  )
)

export default useAuthStore