import { useSuspenseQuery } from '@tanstack/react-query';
import { solutionKeys } from './queries/keys';
import { getSubmittedSolution } from '../apis/solutions';

const useSubmittedSolutions = () => {
  return useSuspenseQuery({
    queryKey: solutionKeys.submitted,
    queryFn: getSubmittedSolution,
  });
};

export default useSubmittedSolutions;
