import CommentsMock from '@/components/SolutionDetail/CommentList/CommentsMock.json';
import { useSuspenseQuery } from '@tanstack/react-query';
import { commentKeys } from './queries/keys';

export const useComments = (solutionId: number) => {
  // TODO(@Ryan): api 나오면 mock 데이터를 사용하지 않고 api 연결할 예정입니다.
  solutionId;

  return useSuspenseQuery({
    queryKey: commentKeys.all,
    queryFn: () => CommentsMock,
    //  () => getComments(solutionId),
  });
};
