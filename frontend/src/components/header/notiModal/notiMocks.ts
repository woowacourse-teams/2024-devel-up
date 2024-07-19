export interface Notification {
  id: number;
  message: string;
  isRead: boolean;
}

export const NOTI_MOCKS: Notification[] = [
  {
    id: 1,
    message: '버건디님과 페어 매칭이 완료되었습니다.',
    isRead: false,
  },
  {
    id: 2,
    message: '리브님으로부터 리뷰가 도착했습니다. 지금 미션 현황 페이지에서 확인해보세요.',
    isRead: false,
  },
];
