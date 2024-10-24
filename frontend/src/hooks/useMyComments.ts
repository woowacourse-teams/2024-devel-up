import { useSuspenseQuery } from '@tanstack/react-query';
import { dashboardKeys } from './queries/keys';
import { getMyComments } from '@/apis/solutionCommentAPI';
import { useEffect } from 'react';

interface UseMyCommentsOptions {
  path: string;
  page: number;
  onPageInfoUpdate?: (totalPage: number) => void;
}

const useMyComments = ({ path, page, onPageInfoUpdate }: UseMyCommentsOptions) => {
  const { data: myCommentsResponse } = useSuspenseQuery({
    queryKey: dashboardKeys.solutionComments(page, path),
    queryFn: () => getMyComments({ page: page.toString() }),
  });

  const { data, currentPage, totalPage } = myCommentsResponse;

  useEffect(() => {
    if (onPageInfoUpdate) {
      onPageInfoUpdate(totalPage);
    }
  }, [currentPage]);

  return { myComments: data, currentPageFromServer: currentPage, totalPage };
};

export default useMyComments;
