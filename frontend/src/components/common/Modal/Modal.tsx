import type { PropsWithChildren } from 'react';
import ModalWrapper from './ModalWrapper';
import { fadeIn, fadeOut } from './Modal.styled';

interface ModalProps extends PropsWithChildren {
  isModalOpen: boolean;
}

export default function Modal({ children, isModalOpen }: ModalProps) {
  return (
    <ModalWrapper
      isOpen={isModalOpen}
      $mountAnimation={fadeIn}
      $unMountAnimation={fadeOut}
      $animationTime={300}
    >
      <ModalWrapper.Portal id="modal">
        <ModalWrapper.Backdrop opacity="rgba(0, 0, 0, 0.3)">
          <ModalWrapper.Container>{children}</ModalWrapper.Container>
        </ModalWrapper.Backdrop>
      </ModalWrapper.Portal>
    </ModalWrapper>
  );
}
