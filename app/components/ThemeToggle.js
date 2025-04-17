'use client';
import { useTheme } from './ThemeProvider';

// This is a hidden component for testing dark mode without changing the design
// You can add it temporarily during development
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50" style={{ opacity: 0.2 }}>
      <button
        onClick={toggleTheme}
        className="bg-gray-200 dark:bg-gray-800 p-2 rounded-full"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? '☀️' : theme === 'light' ? '🌙' : '🌓'}
      </button>
    </div>
  );
}
