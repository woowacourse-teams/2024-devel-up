import NotiList from './NotiList';
import * as S from './NotiModal.styled';
import ListenKeyDown from '@/components/common/ListenKeyDown';
import useClickOutside from '@/hooks/useClickOutside';

interface NotiModalProps {
  closeModal: () => void;
}

export default function NotiModal({ closeModal }: NotiModalProps) {
  const { targetRef } = useClickOutside<HTMLDivElement>(closeModal);

  return (
    <S.NotiModalContainer ref={targetRef}>
      <ListenKeyDown targetKey="Escape" onKeyDown={closeModal} />
      <S.NotiModalTitle>알림</S.NotiModalTitle>
      <NotiList />
    </S.NotiModalContainer>
  );
}
