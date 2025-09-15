import { create } from "zustand";
import api from "../services/api";

const useProductStore = create((set) => ({
  // states
  products: [],
  error: null,
  isLoading: false,

  // actions
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // actions do produto
  // carregar os produtos
  fetchProducts: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.get("/products");
      set({
        products: response.data || [],
        error: null,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage = "Error ao carregar os produtos";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },
  // criar um produto
  createProduct: async (productData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/products", productData);
      const newProduct = response.data.product;
      set((state) => ({
        products: [...state.products, newProduct],
        error: null,
        isLoading: false,
      }));

      return { success: true, newProduct };
    } catch (error) {
      const errorMessage =
        error.response.data.error || "Error ao cadastrar um produto";
      set({
        error: errorMessage,
        isLoading: false,
      });
      return { success: false, error: errorMessage };
    }
  },
  // Deletar um produto
  deleteProduct: async (id) => {
    try {
      await api.delete(`/products/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        error: null,
      }));
      return { success: true };
    } catch (error) {
      const errorMessage = "Error ao apagar um produto";
      set({
        error: error.errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  },
  //   atualizar um produto
  updateProduct: async (id, productData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put(`/products/${id}`, productData);
      const updateProduct = response.data.updatedProduct;

      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? updateProduct : product
        ),
        isLoading: false,
        error: null,
      }));
      return { success: true, product: updateProduct };
    } catch (error) {
      const errorMessage = "Error ao atualizar um produto";
      set({
        error: error.errorMessage,
        isLoading: false,
      });
      return { success: false, error: errorMessage };
    }
  },
}));

export default useProductStore;
