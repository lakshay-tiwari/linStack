import React, { useState } from "react";
import { create } from "zustand";

// ================== TYPES ==================
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

// ================== STORE ==================
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
  posts: [
    {
      id: "1",
      userId: "u1",
      username: "John Doe",
      avatar: "",
      content: "This is my first post!",
      likes: ["u2"],
      comments: [
        {
          id: "c1",
          userId: "u2",
          username: "Jane Smith",
          content: "Nice post!",
          createdAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      userId: "u2",
      username: "Jane Smith",
      avatar: "",
      content: "Hello, world!",
      likes: [],
      comments: [],
      createdAt: new Date().toISOString(),
    },
  ],
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

// ================== COMPONENT ==================
const HomePage: React.FC = () => {
  const { posts, addPost, likePost, addComment } = usePostStore();
  const [newPost, setNewPost] = useState("");
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});

  const currentUserId = "u1"; // dummy logged-in user

  const handleAddPost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now().toString(),
      userId: currentUserId,
      username: "John Doe",
      content: newPost,
      likes: [],
      comments: [],
      createdAt: new Date().toISOString(),
    };
    addPost(post);
    setNewPost("");
  };

  const handleAddComment = (postId: string) => {
    if (!commentText[postId]?.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      userId: currentUserId,
      username: "John Doe",
      content: commentText[postId],
      createdAt: new Date().toISOString(),
    };
    addComment(postId, comment);
    setCommentText({ ...commentText, [postId]: "" });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Create Post */}
      <div className="mb-4 border rounded p-4 bg-white shadow">
        <textarea
          className="w-full border p-2 rounded"
          placeholder="What's on your mind?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button
          onClick={handleAddPost}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Post
        </button>
      </div>

      {/* Posts List */}
      {posts.map((post) => (
        <div key={post.id} className="mb-4 border rounded p-4 bg-white shadow">
          <h3 className="font-bold">{post.username}</h3>
          <p className="mt-1">{post.content}</p>

          {/* Likes */}
          <div className="mt-2">
            <button
              onClick={() => likePost(post.id, currentUserId)}
              className="text-blue-500"
            >
              {post.likes.includes(currentUserId) ? "Unlike" : "Like"}
            </button>
            <span className="ml-2">{post.likes.length} likes</span>
          </div>

          {/* Comments */}
          <div className="mt-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="border-t py-2">
                <span className="font-semibold">{comment.username}:</span>{" "}
                {comment.content}
              </div>
            ))}
            <div className="mt-2 flex">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 border p-2 rounded"
                value={commentText[post.id] || ""}
                onChange={(e) =>
                  setCommentText({ ...commentText, [post.id]: e.target.value })
                }
              />
              <button
                onClick={() => handleAddComment(post.id)}
                className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
