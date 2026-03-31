import { User } from "@/types/user";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (newUser: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()((setStore) => {
  return {
    user: null,
    isAuthenticated: false,

    setUser: (user) => {
      setStore({ user: user, isAuthenticated: true });
    },

    clearIsAuthenticated: () => {
      setStore({ user: null, isAuthenticated: false });
    },
  };
});
