import { getDiscussions } from '@/apis/discussionAPI';
import { useSuspenseQuery } from '@tanstack/react-query';
import { discussionsKeys } from './queries/keys';
import { HASHTAGS } from '@/constants/hashTags';
import { DEFAULT_PAGINATION_SIZE } from './useMissions';
import { useEffect } from 'react';

interface UseDiscussionsOptions {
  mission: string | null;
  hashTag: string | null;
  page: number;
  onPageInfoUpdate?: (totalPage: number) => void;
}

const useDiscussions = ({
  mission = HASHTAGS.all,
  hashTag = HASHTAGS.all,
  page,
  onPageInfoUpdate,
}: UseDiscussionsOptions) => {
  const { data: discussionsResponse } = useSuspenseQuery({
    queryKey: [...discussionsKeys.all, mission, hashTag],
    queryFn: () =>
      getDiscussions({
        mission: mission || HASHTAGS.all,
        hashTag: hashTag || HASHTAGS.all,
        page: page.toString(),
        size: DEFAULT_PAGINATION_SIZE,
      }),
  });

  const { data, currentPage, totalPage } = discussionsResponse;

  useEffect(() => {
    if (onPageInfoUpdate) {
      onPageInfoUpdate(totalPage);
    }
  }, [currentPage]);

  return { discussions: data, currentPageFromServer: currentPage, totalPage };
};

export default useDiscussions;
