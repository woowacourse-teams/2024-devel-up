import { useSuspenseQuery } from '@tanstack/react-query';
import { getSolutionSummaries, type SolutionSummary } from '@/apis/solutions';

const useSolutionSummaries = () => {
  return useSuspenseQuery<SolutionSummary[]>({
    queryKey: ['solutionSummaries'],
    queryFn: getSolutionSummaries,
  });
};

export default useSolutionSummaries;
