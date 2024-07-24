import type { PropsWithChildren } from 'react';
import { ModalProvider } from './ModalProvider';
import type { ModalContextProps } from '@/contexts/ModalContext';
import useAnimation from '@/hooks/useAnimation';
import ModalPortal from './ModalPortal';
import ModalBackdrop from './ModalBackdrop';
import ModalContainer from './ModalContainer';
import ModalTitle from './ModalTitle';
import ModalSubTitle from './ModalSubTitle';
import ModalCloseButton from './ModalCloseButton';

export default function Modal({
  children,
  isOpen = false,
  onClose = (event?: React.SyntheticEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  },
  $mountAnimation = '',
  $unMountAnimation = '',
  position = 'center',
  $animationTime = 300,
  size = 'custom',
}: PropsWithChildren<Partial<ModalContextProps>>) {
  const { open, closing } = useAnimation({
    unMountEvent: onClose,
    $unMountAnimation,
    initialState: isOpen,
    $animationTime,
  });

  const modalProps: ModalContextProps = {
    isOpen,
    position,
    onClose,
    $mountAnimation,
    $unMountAnimation,
    $animationTime,
    closing,
    open,
    size,
  };

  return open ? <ModalProvider value={modalProps}>{children}</ModalProvider> : null;
}

Modal.Portal = ModalPortal;
Modal.Backdrop = ModalBackdrop;
Modal.Container = ModalContainer;
Modal.Title = ModalTitle;
Modal.SubTitle = ModalSubTitle;
Modal.CloseButton = ModalCloseButton;
