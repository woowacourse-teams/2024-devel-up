import { getUserInfo } from '@/apis/authAPI';
import { useQuery } from '@tanstack/react-query';
import { UserInfo } from '../types/user';

const useUserInfo = () => {
  return useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    retry: false,
    throwOnError: false,
  });
};

export default useUserInfo;
