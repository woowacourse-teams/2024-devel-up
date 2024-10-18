import { useSuspenseQuery } from '@tanstack/react-query';
import { getDashboardDiscussionComments } from '@/apis/dashboardAPI';
import { dashboardKeys } from './queries/keys';
import { useEffect } from 'react';

interface UseDashboardDiscussionCommentOptions {
  page: number;
  onPageInfoUpdate?: (totalPage: number) => void;
}

const useDashboardDiscussionComment = ({
  page,
  onPageInfoUpdate,
}: UseDashboardDiscussionCommentOptions) => {
  const { data: dashboardDiscussionCommentResponse } = useSuspenseQuery({
    queryKey: dashboardKeys.discussionComments(page),
    queryFn: () => getDashboardDiscussionComments({ page: page.toString() }),
  });

  const { data, currentPage, totalPage } = dashboardDiscussionCommentResponse;

  useEffect(() => {
    if (onPageInfoUpdate) {
      onPageInfoUpdate(totalPage);
    }
  }, [currentPage]);

  return { discussionCommentList: data, currentPageFromServer: currentPage, totalPage };
};

export default useDashboardDiscussionComment;
