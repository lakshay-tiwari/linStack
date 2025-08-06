import React, { useState } from 'react';
import { Edit3, Calendar, Users } from 'lucide-react';
import PostCard from './PostCard';

const ProfilePage: React.FC = () => {
  // --- Sample User Data ---
  const sampleUser = {
    id: '1',
    username: 'John Doe',
    bio: 'Frontend Developer | React Enthusiast | Coffee Lover',
    followers: Array(120).fill(null),
    following: Array(75).fill(null),
    joinedAt: 'January 2025',
  };

  // --- Sample Posts Data ---
  const samplePosts = [
    {
      id: '1',
      userId: '1',
      username: 'John Doe',
      content: 'Just launched my new portfolio website! 🚀 Check it out and share your feedback!',
      likes: [],
      comments: [
        {
          id: 'c1',
          userId: '2',
          username: 'Jane Smith',
          content: 'Looks amazing! Great work 👏',
          createdAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      userId: '1',
      username: 'John Doe',
      content: 'Exploring Tailwind CSS for rapid UI building 🎨 Loving how fast I can prototype!',
      likes: [],
      comments: [
        {
          id: 'c2',
          userId: '3',
          username: 'Alex Carter',
          content: 'Tailwind is a game changer 🔥',
          createdAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
    },
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: sampleUser.username,
    bio: sampleUser.bio,
  });

  const userPosts = samplePosts.filter(post => post.userId === sampleUser.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-4">
        
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
          
          {/* Profile Info */}
          <div className="p-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
              {/* Avatar */}
              <div className="relative -mt-16 sm:-mt-20">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold border-4 border-white dark:border-gray-800 shadow-lg">
                  {sampleUser.username.charAt(0).toUpperCase()}
                </div>
              </div>
              
              {/* Profile Details */}
              <div className="flex-1 mt-4 sm:mt-0">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Username"
                    />
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {sampleUser.username}
                      </h1>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {sampleUser.bio || 'No bio available. Click "Edit Profile" to add one!'}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{sampleUser.followers.length} followers</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{sampleUser.following.length} following</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {sampleUser.joinedAt}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Posts ({userPosts.length})
            </h2>
          </div>
          
          {userPosts.length === 0 ? (
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
              {userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
