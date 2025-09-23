import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../services/api'
import { storeAction, authError, performance, info, debug } from '../utils/logger'

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
      setLoading: (loading) => {
        storeAction('AuthStore', 'setLoading', { loading })
        set({ isLoading: loading })
      },
      
      setError: (error) => {
        storeAction('AuthStore', 'setError', { error })
        set({ error })
      },
      
      clearError: () => {
        storeAction('AuthStore', 'clearError')
        set({ error: null })
      },
      
      // Login
      login: async (email, senha) => {
        const startTime = Date.now()
        storeAction('AuthStore', 'login', { email })
        
        set({ isLoading: true, error: null })
        
        try {
          const response = await api.post('/auth/login', { email, senha })
          const { client, token } = response.data
          
          // Configurar header do axios
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          set({ 
            user: client, 
            token, 
            isLoading: false,
            error: null 
          })
          
          const duration = Date.now() - startTime
          performance('login', duration, { 
            userId: client.id,
            email: client.email 
          })
          
          info('User logged in successfully', {
            userId: client.id,
            email: client.email
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
          
          authError('login', error, { email })
          
          return { success: false, error: errorMessage }
        }
      },
      
      // Registro
      register: async (nome, email, senha) => {
        const startTime = Date.now()
        storeAction('AuthStore', 'register', { nome, email })
        
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
          
          const duration = Date.now() - startTime
          performance('register', duration, { 
            userId: client.id,
            email: client.email 
          })
          
          info('User registered successfully', {
            userId: client.id,
            email: client.email
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
          
          authError('register', error, { nome, email })
          
          return { success: false, error: errorMessage }
        }
      },
      
      // Logout
      logout: () => {
        storeAction('AuthStore', 'logout')
        info('User logged out')
        
        delete api.defaults.headers.common['Authorization']
        set({ 
          user: null, 
          token: null, 
          error: null 
        })
      },
      
      // Inicializar (configurar axios se já existir token)
      initialize: () => {
        storeAction('AuthStore', 'initialize')
        
        const { token } = get()
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          info('Auth store initialized with existing token')
        } else {
          debug('Auth store initialized without token')
        }
      }
    }),
    {
      name: 'auth-storage', // nome da chave no localStorage
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token 
      }), // apenas persistir user e token
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            authError('rehydrate-auth-store', error)
          } else {
            debug('Auth store rehydrated successfully', {
              hasUser: !!state?.user,
              hasToken: !!state?.token
            })
          }
        }
      }
    }
  )
)

export default useAuthStore