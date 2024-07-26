import { getUserInfo } from '@/apis/authAPI';
import type { UserInfo } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useUserInfo = () => {
  return useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    retry: false,
    throwOnError: false,
  });
};

export default useUserInfo;
