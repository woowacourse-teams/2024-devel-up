import { useSuspenseQuery } from '@tanstack/react-query';
import { solutionCommentKeys } from './queries/keys';
import { getMyComments } from '@/apis/solutionCommentAPI';

const useMyComments = () => {
  return useSuspenseQuery({
    queryKey: solutionCommentKeys.mine,
    queryFn: getMyComments,
  });
};

export default useMyComments;
