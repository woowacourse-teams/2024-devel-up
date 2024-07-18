import NotiList from './NotiList';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useKeyDown } from '@/hooks/useKeyDown';
import * as S from './NotiModal.styled';

interface NotiModalProps {
  closeModal: () => void;
}

export default function NotiModal({ closeModal }: NotiModalProps) {
  const { targetRef } = useClickOutside<HTMLDivElement>(closeModal);
  useKeyDown('Escape', closeModal);

  return (
    <S.NotiModalContainer ref={targetRef}>
      <S.NotiTitle>🔔 알림</S.NotiTitle>
      <NotiList />
    </S.NotiModalContainer>
  );
}
