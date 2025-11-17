import { create } from "zustand";

export const useAuth = create((set) => ({
  token:
    typeof window !== "undefined" ? localStorage.getItem("token") : null,

  setToken: (token) => {
    if (typeof window !== "undefined") {
      if (token) localStorage.setItem("token", token);
      else localStorage.removeItem("token");
    }
    set({ token });
  },
}));
