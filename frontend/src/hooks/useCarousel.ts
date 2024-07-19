import type { PropsWithChildren } from 'react';
import React, { useState, useRef, useEffect } from 'react';

const useCarousel = ({ children }: PropsWithChildren) => {
  const carouselItems = React.Children.toArray(children);
  const carouselItemLength = carouselItems.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const trackRef = useRef<HTMLUListElement>(null);

  const handleTransitionEnd = () => {
    if (currentIndex === carouselItemLength + 1) {
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setCurrentIndex(carouselItemLength);
    }
    setIsSliding(false);
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
    if (!isSliding) {
      setIsSliding(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousSlide = () => {
    if (!isSliding) {
      setIsSliding(true);
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return {
    carouselItems,
    trackRef,
    currentIndex,
    isSliding,
    handleNextSlide,
    handlePreviousSlide,
  };
};

export default useCarousel;
