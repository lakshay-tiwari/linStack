import { create } from "zustand";
import axios from "axios";
import backendUrl from "../backendURI";

interface Author {
  id: string;
  username: string;
}

interface Comment {
  id: string;
  content: string;
  author: Author;
  createdAt: string;
}

interface Like {
  userId: string;
}

interface Post {
  id: string;
  content: string;
  createdAt: string;
  author: Author;
  comments: Comment[];
  likes: Like[];
}

interface UserProfile {
  id: string;
  username: string;
  bio: string;
  email: string;
  followers: any[];
  following: any[];
  joinedAt: string;
  posts: Post[];
}

interface UserStore {
  user: UserProfile | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,

  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await axios.get<UserProfile>(`${backendUrl}/api/users/get-profile`, {
        withCredentials: true,
      });
      set({ user: res.data, loading: false });
    } catch (error) {
      console.error("Error fetching user:", error);
      set({ loading: false });
    }
  },
}));
