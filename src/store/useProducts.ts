import { create } from "zustand";
import { fetchProducts } from "../lib/api";

export const useProducts = create((set) => ({
  products: [],
  loading: false,

  loadProducts: async () => {
    set({ loading: true });
    const data = await fetchProducts();
    set({ products: data, loading: false });
  },

  addProduct: (product) =>
    set((state) => ({
      products: [product, ...state.products],
    })),

  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
}));
