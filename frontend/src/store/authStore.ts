import { create } from "zustand";
import axios from "axios";
import backendUrl from "../backendURI";

interface AuthState {
  user: any | null;
  loading: boolean;
  checkAuth: () => Promise<void>;
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
}));
