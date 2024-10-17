import { useState, useEffect, type RefObject } from 'react';

interface UseScrollComponentOptions {
  threshold?: number;
  index: number;
}

export const useScrollComponent = (
  ref: RefObject<HTMLElement>,
  { threshold = 0.5, index }: UseScrollComponentOptions,
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setCurrentIndex(index);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold, index]);

  return { isVisible, currentIndex };
};
