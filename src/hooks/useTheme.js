import { useEffect, useCallback } from 'react';
import useLocalStorage from './useLocalStorage.js';

const STORAGE_KEY = 'theme';

/**
 * useTheme — manages 'light' | 'dark' theme, persists to localStorage, and
 * syncs the `data-theme` attribute on <html> for CSS variable resolution.
 * First load: respects stored value, then `prefers-color-scheme`, then 'dark'.
 */
export default function useTheme() {
  const [theme, setTheme] = useLocalStorage(STORAGE_KEY, 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}
