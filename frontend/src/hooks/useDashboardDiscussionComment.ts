import { useSuspenseQuery } from '@tanstack/react-query';
import { getDashboardDiscussionComments } from '@/apis/dashboardAPI';
import { DashboardKeys } from './queries/keys';

const useDashboardDiscussionComment = () => {
  return useSuspenseQuery({
    queryFn: getDashboardDiscussionComments,
    queryKey: DashboardKeys.comments,
  });
};

export default useDashboardDiscussionComment;
