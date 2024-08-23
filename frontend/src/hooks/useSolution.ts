import { useSuspenseQuery } from '@tanstack/react-query';
import { solutionKeys } from './queries/keys';
import type { Solution } from '@/types/solution';
import { getSolutionById } from '@/apis/solutions';

const useSolution = (solutionId: number) => {
  return useSuspenseQuery<Solution>({
    queryKey: solutionKeys.detail(solutionId),
    queryFn: () => getSolutionById(solutionId),
  });
};

export default useSolution;
