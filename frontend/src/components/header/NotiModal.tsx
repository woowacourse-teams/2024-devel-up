import { useClickOutside } from '@/hooks/useClickOutside';
import * as S from './Header.styled';
import { useKeyDown } from '@/hooks/useKeyDown';
import { createPortal } from 'react-dom';

export default function NotiModal({ closeModal }: { closeModal: () => void }) {
  const { targetRef } = useClickOutside<HTMLDivElement>(closeModal);
  useKeyDown('Escape', closeModal);

  return createPortal(
    <S.NotiModalContainer ref={targetRef}>노티 모달</S.NotiModalContainer>,
    document.getElementById('root') as HTMLElement,
  );
}
