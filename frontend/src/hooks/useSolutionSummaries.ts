import { useSuspenseQuery } from '@tanstack/react-query';
import { getSolutionSummaries, type SolutionSummary } from '@/apis/solutions';
import { solutionKeys } from './queries/keys';
import { HASHTAGS } from '@/constants/hashTags';

const useSolutionSummaries = (filter: string = HASHTAGS.all) => {
  return useSuspenseQuery<SolutionSummary[]>({
    queryKey: [...solutionKeys.all, filter],
    queryFn: () => getSolutionSummaries(filter),
  });
};

export default useSolutionSummaries;
