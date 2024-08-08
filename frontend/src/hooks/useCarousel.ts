import type { PropsWithChildren } from 'react';
import React, { useState, useRef, useEffect } from 'react';

interface UseCarouselParams extends PropsWithChildren {
  autoPlay: boolean;
  autoSpeed: number;
  infinite: boolean;
}

const useCarousel = ({ autoPlay, autoSpeed, infinite, children }: UseCarouselParams) => {
  const carouselItems = React.Children.toArray(children);
  const carouselItemLength = carouselItems.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const trackRef = useRef<HTMLUListElement>(null);

  const handleTransitionEnd = () => {
    if (infinite) {
      if (currentIndex === carouselItemLength + 1) {
        setCurrentIndex(1);
      } else if (currentIndex === 0) {
        setCurrentIndex(carouselItemLength);
      }
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
  }, [currentIndex, carouselItemLength, infinite]);

  const handleNextSlide = () => {
    if (!isSliding) {
      setIsSliding(true);
      setCurrentIndex((prevIndex) => {
        if (!infinite && prevIndex === carouselItemLength - 1) {
          setIsSliding(false);
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }
  };

  const handlePreviousSlide = () => {
    if (!isSliding) {
      setIsSliding(true);
      setCurrentIndex((prevIndex) => {
        if (!infinite && prevIndex === 0) {
          setIsSliding(false);
          return prevIndex;
        }
        return prevIndex - 1;
      });
    }
  };

  useEffect(() => {
    const initializeAutoPlay = () => {
      if (autoPlay && !isSliding) {
        const autoPlayInterval = setInterval(() => {
          handleNextSlide();
        }, autoSpeed);

        return () => clearInterval(autoPlayInterval);
      }
    };

    const autoPlayCleanup = initializeAutoPlay();
    return () => autoPlayCleanup && autoPlayCleanup();
  }, [autoPlay, autoSpeed, handleNextSlide, isSliding]);

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
