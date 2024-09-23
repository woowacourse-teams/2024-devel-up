import { useSuspenseQuery } from '@tanstack/react-query';
import { dashboardKeys } from './queries/keys';
import { getMyComments } from '@/apis/commentAPI';

const useMyComments = () => {
  return useSuspenseQuery({
    queryKey: dashboardKeys.solutionComments(),
    queryFn: getMyComments,
  });
};

export default useMyComments;
