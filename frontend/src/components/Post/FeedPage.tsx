import React, { useEffect } from "react";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import { usePostStore } from "../../store/postStore";
import { Loader2 } from "lucide-react"; // ✅ for spinner

const FeedPage: React.FC = () => {
  const { posts, fetchPosts, loading } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <CreatePost />
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          ) : posts.length > 0 ? (
            posts.map((p) => (
              <PostCard
                key={p.id}
                post={{
                  id: p.id,
                  username: p.author.username,
                  content: p.content,
                  likes: p.likes?.map((l: any) => l.userId) || [],
                  comments: p.comments,
                  createdAt: p.createdAt,
                }}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No posts yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
