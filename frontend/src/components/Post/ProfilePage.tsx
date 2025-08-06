import React, { useEffect } from "react";
import { Edit3, Calendar, Users, Loader2 } from "lucide-react";
import { useUserStore } from "../../store/userStore";
import PostCard from "../Post/PostCard";

const ProfilePage: React.FC = () => {
  const { user, fetchUser, loading } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-20">
        User not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-4">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
          <div className="h-48 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
          <div className="p-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
              <div className="relative -mt-16 sm:-mt-20">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold border-4 border-white dark:border-gray-800 shadow-lg">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="flex-1 mt-4 sm:mt-0">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {user.username}
                  </h1>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {user.bio || "No bio available."}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{user.followers.length} followers</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{user.following.length} following</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Joined {new Date(user.joinedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Posts ({user.posts.length})
          </h2>
          {user.posts.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
              <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">
                No posts yet
              </h3>
              <p className="text-gray-400 dark:text-gray-500">
                Share your thoughts and connect with your network!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {user.posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={{
                    id: post.id,
                    username: post.author.username,
                    content: post.content,
                    likes: post.likes.map((l) => l.userId),
                    comments: post.comments,
                    createdAt: post.createdAt,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
