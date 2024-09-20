import { getDiscussions } from '@/apis/discussionAPI';
import type { Discussion } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { discussionsKeys } from './queries/keys';

const useDiscussions = (mission: string = 'all', hashTag: string = 'all') => {
  return useSuspenseQuery<Discussion[]>({
    queryKey: [...discussionsKeys.all, mission, hashTag],
    queryFn: () => getDiscussions(mission, hashTag),
  });
};

export default useDiscussions;
