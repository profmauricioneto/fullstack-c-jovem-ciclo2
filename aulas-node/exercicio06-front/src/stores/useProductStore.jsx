import { create } from 'zustand'
import api from '../services/api'

const useProductStore = create((set) => ({
  // Estado
  products: [],
  isLoading: false,
  error: null,
  
  // Actions
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  
  // Buscar todos os produtos
  fetchProducts: async () => {
    set({ isLoading: true, error: null })
    
    try {
      const response = await api.get('/products')
      set({ 
        products: response.data.products || [],
        isLoading: false,
        error: null 
      })
    } catch (error) {
      const errorMessage = 'Erro ao carregar produtos'
      set({ 
        isLoading: false, 
        error: errorMessage 
      })
      throw error
    }
  },
  
  // Criar produto
  createProduct: async (productData) => {
    set({ isLoading: true, error: null })
    
    try {
      const response = await api.post('/products', productData)
      const newProduct = response.data.product
      
      set((state) => ({
        products: [...state.products, newProduct],
        isLoading: false,
        error: null
      }))
      
      return { success: true, product: newProduct }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Erro ao criar produto'
      set({ 
        isLoading: false, 
        error: errorMessage 
      })
      return { success: false, error: errorMessage }
    }
  },
  
  // Deletar produto
  deleteProduct: async (id) => {
    try {
      await api.delete(`/products/${id}`)
      
      set((state) => ({
        products: state.products.filter(product => product.id !== id),
        error: null
      }))
      
      return { success: true }
    } catch (error) {
      const errorMessage = 'Erro ao excluir produto'
      set({ error: error.message })
      return { success: false, error: errorMessage }
    }
  },
  
  // Atualizar produto
  updateProduct: async (id, productData) => {
    set({ isLoading: true, error: null })
    
    try {
      const response = await api.put(`/products/${id}`, productData)
      const updatedProduct = response.data.product
      
      set((state) => ({
        products: state.products.map(product => 
          product.id === id ? updatedProduct : product
        ),
        isLoading: false,
        error: null
      }))
      
      return { success: true, product: updatedProduct }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Erro ao atualizar produto'
      set({ 
        isLoading: false, 
        error: errorMessage 
      })
      return { success: false, error: errorMessage }
    }
  }
}))

export default useProductStore