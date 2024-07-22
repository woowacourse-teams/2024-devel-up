import { useEffect, useState } from 'react';
import type { Keyframes } from 'styled-components/dist/types';

type UseAnimationParams = {
  initialState: boolean;
  $unMountAnimation: string | Keyframes;
  $animationTime: number;
  unMountEvent: () => void;
};

const useAnimation = ({
  initialState,
  $unMountAnimation,
  $animationTime,
  unMountEvent,
}: UseAnimationParams) => {
  const [closing, setClosing] = useState(false);
  const [open, setOpen] = useState(initialState);

  useEffect(() => {
    if (initialState) {
      setOpen(true);
    } else {
      setClosing(true);
    }
  }, [initialState]);

  useEffect(() => {
    if (closing) {
      if ($unMountAnimation) {
        const timer = setTimeout(() => {
          setClosing(false);
          setOpen(false);
          unMountEvent();
        }, $animationTime);

        return () => clearTimeout(timer);
      } else {
        setClosing(false);
        setOpen(false);
        unMountEvent();
      }
    }
  }, [closing, $unMountAnimation]);

  return { open, closing };
};

export default useAnimation;
