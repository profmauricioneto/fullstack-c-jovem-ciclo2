import { create } from 'zustand';
import api from '../services/api';

const useProductStore = create((set) => ({
    // estados
    products: [],
    isLoading: false,
    error: null,

    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),

    // ação de carregar os produtos
    fetchProduct: async () => {
        set({ isLoading: true, error: null })

        try {
            const response = await api.get('/products');
            set({
                products: response.data || [],
                error: null,
                isLoading: false,
            })
        } catch (error) {
            const errorMessage = 'Erro ao carregar os produtos';
            set({
                isLoading: false,
                error: errorMessage
            })
            throw error
        }
    },
    
    // criar um produto
    createProduct: async (newProduct) => {
        set({ isLoading: true, error: null })
        try {
            const response = await api.post('/products', newProduct);
            const productData = response.data;
            set((state) => ({
                products: [...state.products, productData],
                isLoading: false,
                error: null, 
            }))

            return { success: true, product: productData }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Erro ao criar um produto';
            set({
                isLoading: false,
                error: errorMessage
            })
            return { success: false, error: errorMessage }            
        }
    },

    // deletar um produto
    deleteProduct: async (id) => {
        try {
            await api.delete(`/products/${id}`)

            set((state) => ({
                products: state.products.filter(product => product.id !== id),
                error: null
            }))

            return { success: true }
        } catch (error) {
            const errorMessage = 'Erro ao deletar um produto';
            set({
                error: error.errorMessage
            })
            return { success: false, error: errorMessage }            
        }
    },

    // atualizar produto
    updateProduct: async (id, productData) => {
        set({ isLoading: true, error: null })
        try {
            const response = await api.put(`/products/${id}`, productData)
            const updatedProduct = response.data;

            set((state) => ({
                products: state.products.map((product) => product.id === id ? updatedProduct: product),
                isLoading: false,
                error: null,                 
            }))

            return { success: true, product: updatedProduct}
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Erro ao atualizar um produto';
            set({
                isLoading: false,
                error: errorMessage
            })
            return { success: false, error: errorMessage }             
        }
    }

}))

export default useProductStore;