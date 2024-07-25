import * as S from './NotiModal.styled';
import { NOTI_MOCKS } from './notiMocks';

export default function NotiList() {
  const handleRead = () => {
    alert('읽음');
  };

  // 알림 data를 일단 mock으로 처리 @라이언
  const notifications = NOTI_MOCKS;

  const isEmpty = notifications.length === 0;

  return isEmpty ? (
    <div>알림이 없습니다.</div>
  ) : (
    notifications.map(({ id, title, message }) => (
      <S.NotiItem key={id} onClick={handleRead}>
        <S.NotiTitle>{title}</S.NotiTitle>
        <S.NotiMessage>{message}</S.NotiMessage>
      </S.NotiItem>
    ))
  );
}
