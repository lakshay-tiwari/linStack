import React, { useState } from "react";
import Header from "../components/Header";
import FeedPage from "../components/Post/FeedPage";
import SearchPage from "../components/Post/SearchPage";
import NotificationsPage from "../components/Post/NotificationPage";
import ProfilePage from "../components/Post/ProfilePage";

const MainApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("feed");
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  const renderPage = () => {
    switch (currentPage) {
      case "feed":
        return <FeedPage />;
      case "search":
        return <SearchPage />;
      case "notifications":
        return <NotificationsPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <FeedPage />;
    }
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header
          onNavigate={setCurrentPage}
          currentPage={currentPage}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />
        <main>{renderPage()}</main>
      </div>
    </div>
  );
};

export default MainApp;
