import { getUserInfo } from '@/apis/authAPI';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { UserInfo } from '../types/user';
import { userKeys } from './queries/keys';

const useUserInfo = () => {
  return useSuspenseQuery<UserInfo>({
    queryKey: userKeys.info,
    queryFn: getUserInfo,
    retry: false,
  });
};

export default useUserInfo;
