import { useSuspenseQuery } from '@tanstack/react-query';
import { getDashboardDiscussion } from '@/apis/dashboardAPI';
import { dashboardKeys } from './queries/keys';
import { useEffect } from 'react';

interface UseDashboardDiscussionOptions {
  path: string;
  page: number;
  onPageInfoUpdate?: (totalPage: number) => void;
}

const useDashboardDiscussion = ({
  path,
  page,
  onPageInfoUpdate,
}: UseDashboardDiscussionOptions) => {
  const { data: dashboardDiscussionResponse } = useSuspenseQuery({
    queryKey: dashboardKeys.discussionComments(page, path),
    queryFn: () => getDashboardDiscussion({ page: page.toString() }),
  });

  const { data, currentPage, totalPage } = dashboardDiscussionResponse;

  useEffect(() => {
    if (onPageInfoUpdate) {
      onPageInfoUpdate(totalPage);
    }
  }, [currentPage]);

  return { discussionList: data, currentPageFromServer: currentPage, totalPage };
};

export default useDashboardDiscussion;
