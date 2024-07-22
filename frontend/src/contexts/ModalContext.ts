import { createContext, useContext } from 'react';
import { Keyframes } from 'styled-components/dist/types';

export interface ModalContextProps {
  isOpen: boolean;
  onClose: (event?: React.SyntheticEvent) => void;
  $mountAnimation: string | Keyframes;
  $unMountAnimation: string | Keyframes;
  position: 'center' | 'bottom';
  $animationTime: number;
  open: boolean;
  closing: boolean;
  size: 'small' | 'medium' | 'large' | 'custom';
}

const defaultContext: Partial<ModalContextProps> = {
  isOpen: false,
  onClose: (event?: React.SyntheticEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  },
  $mountAnimation: '',
  $unMountAnimation: '',
  position: 'center',
  $animationTime: 300,
  open: true,
  closing: true,
};

export const ModalContext = createContext<Partial<ModalContextProps>>(defaultContext);

export const useModal = () => useContext(ModalContext);
