import React from "react";
import { Send } from "lucide-react";

export const CommentSection: React.FC = () => {
  const comments = [
    {
      id: "1",
      username: "Mike Chen",
      content: "Great work!",
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      username: "Anna Lee",
      content: "Looking forward to seeing more.",
      createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    },
  ];

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const diff = Math.floor((Date.now() - date.getTime()) / 60000);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  return (
    <div className="border-t border-gray-100 dark:border-gray-700">
      {/* Comments List */}
      <div className="px-6 py-4 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-medium text-sm">
              {comment.username.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-white text-sm">
                    {comment.username}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-white">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment Form */}
      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center space-x-3">
        {/* Avatar */}
        <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm">
          Y
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-1 min-w-0 px-4 py-2 text-white bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none"
        />

        {/* Send Button */}
        <button className="flex-shrink-0 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
