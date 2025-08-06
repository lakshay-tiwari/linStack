import React from "react";

const NotificationsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 pt-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Notifications Coming Soon
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Stay tuned for real-time notifications about likes, comments, and new connections.
        </p>
      </div>
    </div>
  );
};

export default NotificationsPage;
