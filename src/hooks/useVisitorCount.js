import { useState, useEffect } from 'react';

const STORAGE_KEY = 'portfolio_visitors';
const SEED_MIN = 1;
const SEED_MAX = 50;

/**
 * useVisitorCount — read/write a visitor count in localStorage.
 * - First visit: seeds a random integer in [SEED_MIN, SEED_MAX].
 * - Each mount: increments by 1 (only in production builds, to avoid HMR inflation).
 * - Returns the current count.
 */
export default function useVisitorCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const current = raw !== null ? parseInt(raw, 10) : NaN;
      const seeded = Number.isFinite(current) ? current : Math.floor(Math.random() * (SEED_MAX - SEED_MIN + 1)) + SEED_MIN;
      const next = seeded + 1;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      setCount(next);
    } catch {
      setCount(0);
    }
  }, []);

  return count;
}
