import { useSuspenseQuery } from '@tanstack/react-query';
import { getMissionInProgress } from '@/apis/missionAPI';
import { missionKeys } from './queries/keys';
import { useEffect } from 'react';

interface UseMissionInProgressOptions {
  page: number;
  onPageInfoUpdate?: (totalPage: number) => void;
}

const useMissionInProgress = ({ page, onPageInfoUpdate }: UseMissionInProgressOptions) => {
  const { data: missionInProgressResponse } = useSuspenseQuery({
    queryKey: missionKeys.detail(page),
    queryFn: () => getMissionInProgress({ page: page.toString() }),
  });

  const { data, currentPage, totalPage } = missionInProgressResponse;

  useEffect(() => {
    if (onPageInfoUpdate) {
      onPageInfoUpdate(totalPage);
    }
  }, [currentPage]);

  return { missionList: data, currentPageFromServer: currentPage, totalPage };
};

export default useMissionInProgress;
