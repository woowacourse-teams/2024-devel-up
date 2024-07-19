import { styled, css } from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ModalContainerProps {
  mountAnimation?: string;
  unMountAnimation?: string;
  animationTime?: string;
  className?: string;
}

export const ModalContainer = styled.div<ModalContainerProps>`
  ${(props) =>
    props.mountAnimation &&
    css`
      animation: ${props.mountAnimation} ${props.animationTime} ease-in-out forwards;
    `}
  ${(props) =>
    props.unMountAnimation &&
    css`
      &.closing {
        animation: ${props.unMountAnimation} ${props.animationTime} ease-in-out forwards;
      }
    `}
`;
