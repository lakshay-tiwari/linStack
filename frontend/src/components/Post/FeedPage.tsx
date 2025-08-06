import React, { useState } from "react";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";

const FeedPage: React.FC = () => {
  const [posts] = useState([
    {
      id: "1",
      userId: "2",
      username: "Sarah Johnson",
      content:
        "Just finished an amazing project with my team! 🚀",
      likes: ["3", "4"],
      comments: [
        {
          id: "1",
          userId: "3",
          username: "Mike Chen",
          content: "Congratulations! Would love to hear more about it.",
          createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        },
      ],
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      userId: "3",
      username: "Mike Chen",
      content:
        "Thoughts on the latest developments in AI and ML? 🤖",
      likes: ["1", "4"],
      comments: [],
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <CreatePost />
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
