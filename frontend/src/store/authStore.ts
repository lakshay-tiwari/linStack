import { create } from "zustand";
import axios from "axios";
import backendUrl from "../backendURI";

interface User{
  id: string,
  username: string,
  email: string,
  createdAt: string
}

interface AuthState {
  user: User | null;
  loading: boolean;
  checkAuth: () => Promise<void>;
  setUser: (user: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  checkAuth: async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/auth/me`, {
        withCredentials: true,
      });
      set({ user: res.data, loading: false });

    } catch (error) {
      set({ user: null, loading: false });
    }
  },
  setUser: (user) => set({ user, loading: false })
}));
