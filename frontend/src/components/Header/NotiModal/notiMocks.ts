export interface Notification {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
}

export const NOTI_MOCKS: Notification[] = [
  {
    id: 1,
    title: '리뷰가 도착했어요!',
    message:
      '버건디님으로부터 리뷰가 도착했어요. 지금 미션 현황 페이지에서 확인해보세요. 지금 미션 현황 페이지에서 확인해보세요. 지금 미션 현황 페이지에서 확인해보세요.',
    isRead: false,
  },
  {
    id: 2,
    title: '리뷰가 도착했어요!',
    message:
      '리브님으로부터 리뷰가 도착했습니다. 지금 미션 현황 페이지에서 확인해보세요. 지금 미션 현황 페이지에서 확인해보세요. 지금 미션 현황 페이지에서 확인해보세요.',
    isRead: false,
  },
];
