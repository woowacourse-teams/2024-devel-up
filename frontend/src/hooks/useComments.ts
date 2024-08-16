import { useSuspenseQuery } from '@tanstack/react-query';
import { commentKeys } from './queries/keys';
import { getComments } from '@/apis/commentAPI';

export const useComments = (solutionId: number) => {
  return useSuspenseQuery({
    queryKey: commentKeys.all,
    queryFn: () => getComments(solutionId),
  });
};
