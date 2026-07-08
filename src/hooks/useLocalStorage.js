import { useState, useEffect, useCallback } from 'react';

/**
 * useLocalStorage — like useState, but mirrors to localStorage and survives reloads.
 * Falls back to `initialValue` if storage is unavailable or stored JSON is corrupt.
 * Cross-tab sync via the native `storage` event.
 */
export default function useLocalStorage(key, initialValue) {
  const read = useCallback(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [value, setValue] = useState(read);

  const set = useCallback(
    (next) => {
      setValue(next);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* quota or disabled storage — ignore */
      }
    },
    [key],
  );

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== key) return;
      try {
        setValue(e.newValue !== null ? JSON.parse(e.newValue) : initialValue);
      } catch {
        setValue(initialValue);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key, initialValue]);

  return [value, set];
}
