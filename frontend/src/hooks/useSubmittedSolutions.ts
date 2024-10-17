import { useSuspenseQuery } from '@tanstack/react-query';
import { solutionKeys } from './queries/keys';
import { getSubmittedSolution } from '../apis/solutions';
import { useEffect } from 'react';

interface UseSubmittedSolutionsOptions {
  page: number;
  onPageInfoUpdate?: (totalPage: number) => void;
}

const useSubmittedSolutions = ({ page, onPageInfoUpdate }: UseSubmittedSolutionsOptions) => {
  const { data: submittedSolutionsResponse } = useSuspenseQuery({
    queryKey: solutionKeys.submitted(page),
    queryFn: () => getSubmittedSolution({ page: page.toString() }),
  });

  const { data, currentPage, totalPage } = submittedSolutionsResponse;

  useEffect(() => {
    if (onPageInfoUpdate) {
      onPageInfoUpdate(totalPage);
    }
  }, [currentPage]);

  return { submittedSolutionList: data, currentPageFromServer: currentPage, totalPage };
};

export default useSubmittedSolutions;
