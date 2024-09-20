import { useSuspenseQuery } from '@tanstack/react-query';
import { getDashboardDiscussionComments } from '@/apis/dashboardAPI';
import { dashboardKeys } from './queries/keys';

const useDashboardDiscussionComment = () => {
  return useSuspenseQuery({
    queryFn: getDashboardDiscussionComments,
    queryKey: dashboardKeys.comments,
  });
};

export default useDashboardDiscussionComment;
