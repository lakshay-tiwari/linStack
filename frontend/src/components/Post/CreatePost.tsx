import React from "react";
import { Send, Image, Smile } from "lucide-react";

export const CreatePost: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex space-x-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
          S
        </div>
        <div className="flex-1">
          <textarea
            placeholder="What's on your mind?"
            rows={3}
            className="w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-none resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Responsive bottom bar */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 gap-3">
        {/* Left actions */}
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="flex items-center space-x-2 px-4 py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
          >
            <Image className="w-5 h-5" />
            <span className="font-medium">Photo</span>
          </button>
          <button
            type="button"
            className="flex items-center space-x-2 px-4 py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
          >
            <Smile className="w-5 h-5" />
            <span className="font-medium">Feeling</span>
          </button>
        </div>

        {/* Post button */}
        <button
          type="button"
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
        >
          <Send className="w-5 h-5" />
          <span>Post</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
