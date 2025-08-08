import React, { useState, useEffect } from "react";
import { Sun, Moon, User, LogOut, Home, Search, Bell, Menu, X } from "lucide-react";
import axios from "axios";
import backendUrl from "../backendURI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { getFirstLetter } from "../utils/getFirstLetter";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  isDark: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onNavigate,
  currentPage,
  isDark,
  toggleTheme,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const username = user?.username || '';
  const navigate = useNavigate();

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  const navItems = [
    { id: "feed", icon: Home, label: "Feed" },
    { id: "search", icon: Search, label: "Search" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button
              onClick={() => onNavigate("feed")}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              SocialConnect
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 , cursor-pointer ${
                    currentPage === item.id
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <div className="hidden md:flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                  {getFirstLetter(username)}
                </div>
                <button
                  onClick={async ()=>{
                    try {
                      console.log('hi')
                      //@ts-ignore
                      const response = await axios.get(`${backendUrl}/api/auth/signout`, { withCredentials: true });
                      toast.success('Signout Successfully!');
                      navigate('/signin');
                    } catch (error) {
                      console.log(error);
                      toast.error('Something went wrong');
                    }
                  }}
                  className="p-2 rounded-full cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col">
          {/* Top Bar */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Menu
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center justify-center flex-1 space-y-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center text-2xl px-6 py-3 rounded-lg w-3/4 justify-center transition-all duration-200 ${
                  currentPage === item.id
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <item.icon className="w-6 h-6 mr-3" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Footer with user info */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                {getFirstLetter(username)}
              </div>
              <span className="text-gray-800 dark:text-gray-200 font-medium">
                {capitalizeFirstLetter(username)}
              </span>
            </div>
            <button
              onClick={async () => {
                try {
                  //@ts-ignore
                  const res = await axios.get(`${backendUrl}/api/auth/signout`, { withCredentials: true });
                  toast.success('Signout Successfully!');
                  navigate('/signin');
                } catch (error) {
                  console.log(error);
                  toast.error('Something went wrong');
                }
              }}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
