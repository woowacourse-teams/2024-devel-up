import { useSuspenseQuery } from '@tanstack/react-query';
import { getDashboardDiscussion } from '@/apis/dashboardAPI';
import { DashboardKeys } from './queries/keys';

const useDashboardDiscussion = () => {
  return useSuspenseQuery({
    queryFn: getDashboardDiscussion,
    queryKey: DashboardKeys.discussion,
  });
};

export default useDashboardDiscussion;
