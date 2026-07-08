import { useEffect, useRef, useState } from 'react';

/**
 * useInView — IntersectionObserver wrapper.
 * Returns [ref, inView]. Attach `ref` to a DOM node; `inView` flips to true
 * the first time the node enters the viewport (and stays true).
 */
export default function useInView({ rootMargin = '0px', threshold = 0.15, once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return [ref, inView];
}
