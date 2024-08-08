import type { UserInfo } from '@/types/user';
import { develupAPIClient } from './clients/develupClient';
import { PATH } from './paths';

interface GetUserInfoResponse {
  data: UserInfo;
}

export const getUserInfo = async (): Promise<UserInfo> => {
  const { data } = await develupAPIClient.get<GetUserInfoResponse>(PATH.userInfo);

  // TODO(@ryan): 시연을 위해 description 임시 추가
  return { ...data, description: '안녕하세요, 다같이 화이팅해봅시다!' };
};

export const deleteLogout = async () => {
  return await develupAPIClient.delete(PATH.logout);
};
