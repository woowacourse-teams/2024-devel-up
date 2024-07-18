import { UserInfo } from '@/types';

//TODO 일단 관심사 별로 API.ts 로 나누어 놓은 것인데,
// 이 또한 추후에 논의해보아야 할듯 해요 ~ @버건디

export const getUserInfo = async (accessToken: string) => {
  // TODO 린트에러로 인하여 선언만 해놓습니다.
  accessToken;

  const MOCK_USER_INFO: UserInfo = {
    login: 'brgndyy',
    id: 5643534,
    avatar_url: 'https://avatars.githubusercontent.com/u/75781414?v=4',
    email: 'brgndyy@gmail.com',
    name: 'Taeheon Jeon',
  };

  return MOCK_USER_INFO;
};
