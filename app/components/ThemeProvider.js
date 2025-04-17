'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// Create context
const ThemeContext = createContext({
  theme: 'system',
  setTheme: () => null,
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('system');

  // On mount, read from localStorage and apply theme
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  // When theme changes, update the document
  useEffect(() => {
    const root = document.documentElement;

    // Remove both classes first
    root.classList.remove('light', 'dark');

    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.add('light');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // If theme is 'system' and user prefers dark
      root.classList.add('dark');
    } else {
      // If theme is 'system' and user prefers light
      root.classList.add('light');
    }

    // Save to localStorage
    if (theme !== 'system') {
      localStorage.setItem('theme', theme);
    } else {
      localStorage.removeItem('theme');
    }
  }, [theme]);

  const value = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
