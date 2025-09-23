import axios from 'axios'
import { apiCall, apiResponse, authError } from '../utils/logger'

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

// Interceptor para logs de requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log da requisição
    apiCall(
      config.method?.toUpperCase() || 'UNKNOWN',
      config.url || '',
      config.data,
      {
        headers: config.headers,
        correlationId: config.headers['x-correlation-id'] || `req-${Date.now()}`
      }
    )

    // Adicionar timestamp para medir duração
    config.metadata = { startTime: Date.now() }
    
    return config
  },
  (error) => {
    authError('request-interceptor', error, {
      type: 'request-interceptor'
    })
    return Promise.reject(error)
  }
)

// Interceptor para logs de respostas
api.interceptors.response.use(
  (response) => {
    // Calcular duração
    const duration = response.config.metadata 
      ? Date.now() - response.config.metadata.startTime 
      : 0

    // Log da resposta bem-sucedida
    apiResponse(
      response.config.method?.toUpperCase() || 'UNKNOWN',
      response.config.url || '',
      response.status,
      response.data,
      {
        headers: response.headers,
        duration
      }
    )

    return response
  },
  (error) => {
    const status = error.response?.status || 0
    const url = error.config?.url || 'unknown'
    const method = error.config?.method?.toUpperCase() || 'UNKNOWN'
    
    // Calcular duração mesmo em caso de erro
    const duration = error.config?.metadata 
      ? Date.now() - error.config.metadata.startTime 
      : 0

    // Log do erro da API
    apiResponse(
      method,
      url,
      status,
      error.response?.data,
      {
        errorMessage: error.message,
        type: 'api-error',
        duration
      }
    )

    // Tratar erros de autenticação
    if (status === 401) {
      authError('token-expired-or-invalid', error, {
        url,
        method
      })
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default api