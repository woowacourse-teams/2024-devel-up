import { useSuspenseQuery } from '@tanstack/react-query';
import { discussionKeys } from './queries/keys';
import type { Discussion } from '@/types/discussion';
import { getDiscussionById } from '@/apis/discussions';

const useDiscussion = (discussionId: number) => {
  return useSuspenseQuery<Discussion>({
    queryKey: discussionKeys.detail(discussionId),
    queryFn: () => getDiscussionById(discussionId),
  });
};

export default useDiscussion;
