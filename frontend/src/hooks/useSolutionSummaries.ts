import { useSuspenseQuery } from '@tanstack/react-query';
import { getSolutionSummaries } from '@/apis/solutions';
import { solutionKeys } from './queries/keys';
import { HASHTAGS } from '@/constants/hashTags';
import { DEFAULT_PAGINATION_SIZE } from './useMissions';
import { useEffect } from 'react';

interface UseSolutionSummariesOptions {
  mission: string | null;
  hashTag: string | null;
  page: number;
  onPageInfoUpdate?: (totalPage: number) => void;
}

const useSolutionSummaries = ({
  mission = HASHTAGS.all,
  hashTag = HASHTAGS.all,
  page,
  onPageInfoUpdate,
}: UseSolutionSummariesOptions) => {
  const { data: solutionSummariesResponse } = useSuspenseQuery({
    queryKey: [...solutionKeys.all, mission, hashTag, page],
    queryFn: () =>
      getSolutionSummaries({
        mission: mission || HASHTAGS.all,
        hashTag: hashTag || HASHTAGS.all,
        page: page.toString(),
        size: DEFAULT_PAGINATION_SIZE,
      }),
  });

  const { data, currentPage, totalPage } = solutionSummariesResponse;

  //TODO useEffect 외부에서 선언하면 too many renders에러가 발생하여 일단 useEffect내부로 넣습니다!
  useEffect(() => {
    if (onPageInfoUpdate) {
      onPageInfoUpdate(totalPage);
    }
  }, [currentPage]);

  return { solutionSummaries: data, currentPageFromServer: currentPage, totalPage };
};

export default useSolutionSummaries;
