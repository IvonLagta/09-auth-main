import { create } from 'zustand';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean | null;
  setUser: (user: any) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: null, 

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  clearIsAuthenticated: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
