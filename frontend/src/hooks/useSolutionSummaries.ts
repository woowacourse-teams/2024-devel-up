import { useSuspenseQuery } from '@tanstack/react-query';
import { getSolutionSummaries, type SolutionSummary } from '@/apis/solutions';
import { solutionKeys } from './queries/keys';
import { HASHTAGS } from '@/constants/hashTags';

const useSolutionSummaries = (mission: string = HASHTAGS.all, hashTag: string = HASHTAGS.all) => {
  return useSuspenseQuery<SolutionSummary[]>({
    queryKey: [...solutionKeys.all, mission, hashTag],
    queryFn: () => getSolutionSummaries({ mission, hashTag }),
  });
};

export default useSolutionSummaries;
