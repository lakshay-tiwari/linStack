import React, { useState } from "react";
import { Send, Image, Smile, Loader2 } from "lucide-react"; // ✅ Loader2 for spinner
import axios from "axios";
import backendUrl from "../../backendURI";
import toast from "react-hot-toast";
import { usePostStore } from "../../store/postStore";
import { useAuthStore } from "../../store/authStore";
import { getFirstLetter } from "../../utils/getFirstLetter";

export const CreatePost: React.FC = () => {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state
  const addPost = usePostStore((state) => state.addPost);
  const userData = useAuthStore((state) => state.user);
  const user = userData?.username || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post.trim()) {
      toast.error("Post shouldn't be empty");
      return;
    }

    setLoading(true); // ✅ start loader

    try {
      const createPostBody = { content: post };
      const response = await axios.post(
        `${backendUrl}/api/posts/create`,
        createPostBody,
        { withCredentials: true }
      );

      addPost(response.data);
      toast.success("Post created Successfully!");
      setPost("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false); // ✅ stop loader
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex space-x-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
          {getFirstLetter(user)}
        </div>
        <div className="flex-1">
          <textarea
            placeholder="What's on your mind?"
            rows={3}
            value={post}
            onChange={(e) => setPost(e.target.value)}
            disabled={loading} 
            className="w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-none resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 gap-3">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
          >
            <Image className="w-5 h-5" />
            <span className="font-medium">Photo</span>
          </button>
          <button
            type="button"
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
          >
            <Smile className="w-5 h-5" />
            <span className="font-medium">Feeling</span>
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center space-x-2 px-6 py-3 text-white rounded-xl font-medium transition-all duration-200 shadow-lg w-full sm:w-auto
            ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl"
            }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> {/* ✅ spinner */}
              <span>Posting...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Post</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
