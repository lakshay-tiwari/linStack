import { create } from 'zustand';

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  content: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

interface PostState {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (postId: string, updates: Partial<Post>) => void;
  deletePost: (postId: string) => void;
  likePost: (postId: string, userId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  updatePost: (postId, updates) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, ...updates } : post
      ),
    })),
  deletePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    })),
  likePost: (postId, userId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likes.includes(userId)
                ? post.likes.filter((id) => id !== userId)
                : [...post.likes, userId],
            }
          : post
      ),
    })),
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      ),
    })),
}));