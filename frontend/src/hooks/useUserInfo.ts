import { getUserInfo } from '@/apis/authAPI';
import { useQuery } from '@tanstack/react-query';
import type { UserInfo } from '../types/user';
import { userKeys } from './queries/keys';

const useUserInfo = () => {
  return useQuery<UserInfo>({
    queryKey: userKeys.info,
    queryFn: getUserInfo,
    retry: false,
    throwOnError: false,
  });
};

export default useUserInfo;
