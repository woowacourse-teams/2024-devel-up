import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/apis/authAPI';
import { UserInfo } from '@/types';

const useUserInfo = () => {
  //TODO 아직 토큰 로직에 관한 부분이 미정이라서
  // 일단 목 토큰을 내부에 만들어놓습니다. @버건디

  const MOCK_ACCESS_TOKEN = 'abcd';

  //TODO useQuery와 useSuspenseQuery 선택중에 일단 useQuery로 구현합니다.
  // 추후에 논의해야합니다 @버건디
  const { data, isLoading, isError } = useQuery<UserInfo>({
    queryKey: [MOCK_ACCESS_TOKEN],
    queryFn: () => getUserInfo(MOCK_ACCESS_TOKEN),
  });

  console.log(data);

  return { userInfo: data, isLoading, isError };
};

export default useUserInfo;
