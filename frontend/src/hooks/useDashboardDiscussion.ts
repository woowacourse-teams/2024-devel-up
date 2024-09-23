import { useSuspenseQuery } from '@tanstack/react-query';
import { getDashboardDiscussion } from '@/apis/dashboardAPI';
import { dashboardKeys } from './queries/keys';

const useDashboardDiscussion = () => {
  return useSuspenseQuery({
    queryFn: getDashboardDiscussion,
    queryKey: dashboardKeys.discussions(),
  });
};

export default useDashboardDiscussion;
