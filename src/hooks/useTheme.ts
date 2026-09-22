import { useEffect } from 'react';

export type Theme = 'dark' | 'light';

export function useTheme() {
  const theme: Theme = 'dark';

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', 'dark');
    root.classList.add('dark');
    localStorage.setItem('emotion-theme', 'dark');
  }, []);

  const toggleTheme = () => {
    // Permanently locked to dark mode
  };

  const setTheme = (_newTheme?: Theme) => {
    // Permanently locked to dark mode
  };

  return { theme, setTheme, toggleTheme };
}
