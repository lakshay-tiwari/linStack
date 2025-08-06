import { create } from 'zustand';
import axios from 'axios';
import backendUrl from '../backendURI';

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

interface PostStore {
  posts: Post[];
  loading: boolean;
  fetchPosts: () => Promise<void>;
  addPost: (post: Post) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  loading: false,
  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts], // latest first
    })),
  fetchPosts: async () => {
    set({ loading: true }); // ✅ start loader before API call
    try {
      const res = await axios.get<{ posts: Post[] }>(
        `${backendUrl}/api/posts/`,
        { withCredentials: true }
      );
      set({ posts: res.data.posts, loading: false }); // ✅ stop loader after success
    } catch (error) {
      console.error("Error fetching posts:", error);
      set({ loading: false }); // ✅ stop loader on error
    }
  },
}));
