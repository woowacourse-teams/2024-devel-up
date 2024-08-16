import { useSuspenseQuery } from '@tanstack/react-query';
import { getSolutionSummaries, type SolutionSummary } from '@/apis/solutions';
import { solutionKeys } from './queries/keys';

const useSolutionSummaries = () => {
  return useSuspenseQuery<SolutionSummary[]>({
    queryKey: solutionKeys.summaries,
    queryFn: getSolutionSummaries,
  });
};

export default useSolutionSummaries;
