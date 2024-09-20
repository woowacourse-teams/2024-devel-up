import { useSuspenseQuery } from '@tanstack/react-query';
import { discussionKeys } from './queries/keys';
import type { DiscussionDetail } from '@/types/discussion';
import { getDiscussionById } from '@/apis/discussionAPI';

const useDiscussion = (discussionId: number) => {
  return useSuspenseQuery<DiscussionDetail>({
    queryKey: discussionKeys.detail(discussionId),
    queryFn: () => getDiscussionById(discussionId),
  });
};

export default useDiscussion;
