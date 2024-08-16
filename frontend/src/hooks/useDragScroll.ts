import type React from 'react';
import { useState } from 'react';

const useDragScroll = <T extends HTMLElement>() => {
  const [isActive, setIsActive] = useState(false);
  const [prevPositionX, setPrevPositionX] = useState(0);
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const inActive = () => {
    setIsActive(false);
    setIsDragging(false);
  };

  const onMouseMove: React.MouseEventHandler<T> = (e) => {
    if (isActive) {
      setIsDragging(true);
      const moveX = e.clientX - mouseDownClientX;
      e.currentTarget.scrollTo(prevPositionX - moveX, 0);
    }
  };

  const onMouseDown: React.MouseEventHandler<T> = (e) => {
    setIsActive(true);
    setIsDragging(false);
    setMouseDownClientX(e.clientX);
    setPrevPositionX(e.currentTarget.scrollLeft);
    e.currentTarget.style.cursor = 'grabbing';
  };

  const onMouseUp: React.MouseEventHandler<T> = (e) => {
    setIsActive(false);
    e.currentTarget.style.cursor = 'grab';
  };

  return { inActive, onMouseDown, onMouseMove, onMouseUp, isDragging };
};

export default useDragScroll;
