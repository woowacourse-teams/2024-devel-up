import { useState, useEffect, type RefObject } from 'react';

interface UseScrollComponentOptions {
  threshold?: number;
}

export const useScrollComponent = (
  refs: RefObject<HTMLOptionElement>[],
  { threshold = 0.5 }: UseScrollComponentOptions,
) => {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.findIndex((ref) => ref.current === entry.target);
          if (entry.isIntersecting && index !== -1) {
            setVisibleIndex(index);
          }
        });
      },
      { threshold },
    );

    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [refs, threshold]);

  return { visibleIndex };
};
