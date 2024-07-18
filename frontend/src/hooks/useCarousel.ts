import type { PropsWithChildren } from 'react';
import React, { useState, useRef, useEffect } from 'react';

const useCarousel = ({ children }: PropsWithChildren) => {
  const carouselItems = React.Children.toArray(children);
  const carouselItemLength = carouselItems.length;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef<HTMLUListElement>(null);

  const handleTransitionEnd = () => {
    if (currentIndex === carouselItemLength + 1) {
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setCurrentIndex(carouselItemLength);
    }
    setIsAnimating(false);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      track.addEventListener('transitionend', handleTransitionEnd);
      return () => {
        track.removeEventListener('transitionend', handleTransitionEnd);
      };
    }
  }, [currentIndex, carouselItemLength]);

  const handleNextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return {
    carouselItems,
    trackRef,
    currentIndex,
    isAnimating,
    handleNextSlide,
    handlePreviousSlide,
  };
};

export default useCarousel;
