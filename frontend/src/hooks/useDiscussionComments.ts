import { useSuspenseQuery } from '@tanstack/react-query';
import { discussionCommentKeys } from './queries/keys';
import { getDiscussionComments } from '@/apis/discussionCommentAPI';

export const useDiscussionComments = (discussionId: number) => {
  return useSuspenseQuery({
    queryKey: discussionCommentKeys.all(discussionId),
    queryFn: () => getDiscussionComments(discussionId),
  });
};
