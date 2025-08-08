import React, { useState } from "react";
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react";
import CommentSection from "./CommentSection";
import { comingSoonToast } from "../../utils/toastUtils";
import { getFirstLetter } from "../../utils/getFirstLetter";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
interface PostCardProps {
  post: {
    id: string;
    username: string;
    content: string;
    likes: string[];
    comments: any[];
    createdAt: string;
  };
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  //@ts-ignore
  const [showComments, setShowComments] = useState(false);

  const formatFullDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short", // Feb
      day: "numeric", // 6
      year: "numeric", // 2025
      hour: "numeric", // 3
      minute: "2-digit", // 45
      hour12: true, // AM/PM format
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 pb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
            {getFirstLetter(post.username)}
          </div>
          <div className="text-white">
            <h3 className="font-semibold">{capitalizeFirstLetter(post.username)}</h3>
            <p className="text-sm text-gray-500">{formatFullDateTime(post.createdAt)}</p>
          </div>
        </div>
        <MoreHorizontal className="w-5 h-5 text-gray-500" />
      </div>
      <div className="px-6 pb-4 text-white">
        <p>{post.content}</p>
      </div>
      <div className="px-6 py-4 border-t flex space-x-6">
        <button className="flex items-center space-x-2 text-gray-500">
          <Heart className="w-5 h-5" />
          <span>{post.likes.length}</span>
        </button>
        <button
          onClick={() => {
            comingSoonToast();
            // setShowComments(!showComments)
          }}
          className="flex items-center space-x-2 text-gray-500"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments.length}</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500" >
          <Share className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>
      {showComments && <CommentSection />}
    </div>
  );
};

export default PostCard;
