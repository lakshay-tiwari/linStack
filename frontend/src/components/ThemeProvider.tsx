import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useThemeStore } from '../store/themeStore';

interface ThemeContextType {
  isDark: boolean;
  toggle: () => void; // used to change from dark to light
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { isDark, toggle } = useThemeStore();

  // Apply theme to document root for better dark mode support
  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);
  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      <div className={isDark ? 'dark' : ''}>{children}</div>
    </ThemeContext.Provider>
  );
};