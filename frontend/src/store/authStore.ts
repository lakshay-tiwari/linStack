import { create } from "zustand";
import axios from "axios";
import backendUrl from "../backendURI";

interface AuthState {
  user: any | null;
  loading: boolean;
  username: string,
  checkAuth: () => Promise<void>;
  setUser: (user: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  username: 'John',
  checkAuth: async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/auth/me`, {
        withCredentials: true,
      });
      set({ user: res.data, loading: false });
      set({username : res.data.username});
    } catch (error) {
      set({ user: null, loading: false });
    }
  },
  setUser: (user) => set({ user, loading: false })
}));
