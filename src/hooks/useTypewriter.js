import { useState, useEffect, useRef } from 'react';

/**
 * useTypewriter — cycles through `words`, typing one character at a time,
 * pausing on the full word, then deleting before advancing to the next.
 * Returns { text } — the currently displayed string (no caret; render that yourself).
 */
export default function useTypewriter(
  words,
  { typeSpeed = 90, deleteSpeed = 45, pauseMs = 1200 } = {},
) {
  const [text, setText] = useState('');
  const wordIndex = useRef(0);
  const charIndex = useRef(0);
  const phase = useRef('typing'); // 'typing' | 'pausing' | 'deleting'
  const timer = useRef(null);

  useEffect(() => {
    if (!words || words.length === 0) return undefined;

    const tick = () => {
      const current = words[wordIndex.current];

      if (phase.current === 'typing') {
        charIndex.current += 1;
        setText(current.slice(0, charIndex.current));
        if (charIndex.current >= current.length) {
          phase.current = 'pausing';
          timer.current = setTimeout(tick, pauseMs);
          return;
        }
        timer.current = setTimeout(tick, typeSpeed);
      } else if (phase.current === 'pausing') {
        phase.current = 'deleting';
        timer.current = setTimeout(tick, deleteSpeed);
      } else {
        charIndex.current -= 1;
        setText(current.slice(0, charIndex.current));
        if (charIndex.current <= 0) {
          phase.current = 'typing';
          wordIndex.current = (wordIndex.current + 1) % words.length;
          timer.current = setTimeout(tick, typeSpeed);
          return;
        }
        timer.current = setTimeout(tick, deleteSpeed);
      }
    };

    timer.current = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timer.current);
  }, [words, typeSpeed, deleteSpeed, pauseMs]);

  return { text };
}
