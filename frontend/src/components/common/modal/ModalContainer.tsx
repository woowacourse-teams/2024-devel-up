import { ModalContext } from '@/contexts/ModalContext';
import { PropsWithChildren, useContext } from 'react';
import * as S from './Modal.styled';

const convertAnimationTime = (time: number) => {
  return `${time / 1000}s`;
};

export default function ModalContainer({ children }: PropsWithChildren) {
  const {
    mountAnimation,
    unMountAnimation,
    animationTime = 500,
    closing,
  } = useContext(ModalContext);

  const convertedAnimationTime = convertAnimationTime(animationTime);

  return (
    <S.ModalContainer
      //   mountAnimation={mountAnimation}
      //   unMountAnimation={unMountAnimation}
      animationTime={convertedAnimationTime}
      className={closing ? 'closing' : ''}
    >
      {children}
    </S.ModalContainer>
  );
}
