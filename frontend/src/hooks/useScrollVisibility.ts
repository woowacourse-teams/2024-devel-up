import { useEffect, useState } from 'react';
import { debounce } from '@/utils/debounce';

export function useScrollVisibility(threshold: number = 0) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return isVisible;
}
