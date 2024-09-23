import { useSuspenseQuery } from '@tanstack/react-query';
import { solutionCommentKeys } from './queries/keys';
import { getSolutionComments } from '@/apis/solutionCommentAPI';

export const useSolutionComments = (solutionId: number) => {
  return useSuspenseQuery({
    queryKey: solutionCommentKeys.all(solutionId),
    queryFn: () => getSolutionComments(solutionId),
  });
};
