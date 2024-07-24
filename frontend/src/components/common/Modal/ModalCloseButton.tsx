import CloseIcon from '@/assets/images/close.svg';
import * as S from './Modal.styled';
import { useContext } from 'react';
import { ModalContext } from '@/contexts/ModalContext';

export default function ModalCloseButton() {
  const { onClose } = useContext(ModalContext);

  return (
    <S.CloseButtonContainer>
      <CloseIcon width={14} height={14} onClick={onClose} />
    </S.CloseButtonContainer>
  );
}
