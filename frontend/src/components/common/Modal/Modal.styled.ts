import { styled, css, keyframes } from 'styled-components';
import type { Keyframes } from 'styled-components/dist/types';

export const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(400px) scale(0.75);
  }
  75% {
    opacity: 1;
    transform: translateY(-16px) scale(1);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  75% {
    opacity: 1;
    transform: translateY(-16px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(400px) scale(0.75);
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ModalContainerProps {
  $mountAnimation?: string | Keyframes;
  $unMountAnimation?: string | Keyframes;
  $animationTime?: string;
  className?: string;
}

export const ModalContainer = styled.div<ModalContainerProps>`
  ${(props) =>
    props.$mountAnimation &&
    css`
      animation: ${props.$mountAnimation} ${props.$animationTime} ease-in-out forwards;
    `}
  ${(props) =>
    props.$unMountAnimation &&
    css`
      &.closing {
        animation: ${props.$unMountAnimation} ${props.$animationTime} ease-in-out forwards;
      }
    `}
`;
