import { useMutation } from '@tanstack/react-query';
import type { UsePostCommentMutation } from '@/components/CommentSection/CommentForm/types';
import { queryClient } from '..';
import { discussionCommentKeys } from './queries/keys';
import {
  postDiscussionComment,
  type PostDiscussionCommentResponseData,
} from '@/apis/discussionCommentAPI';
import type { PostCommentParams } from '@/components/CommentSection/CommentForm/types';

export type UsePostDiscussionCommentMutation =
  UsePostCommentMutation<PostDiscussionCommentResponseData>;

const usePostDiscussionCommentMutation: UsePostDiscussionCommentMutation = (
  onSuccess?: () => void,
  onError?: (error: Error) => void,
) => {
  return useMutation<PostDiscussionCommentResponseData, Error, PostCommentParams>({
    mutationFn: postDiscussionComment,
    onSuccess: ({ discussionId }) => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: discussionCommentKeys.all(discussionId) });
    },
    onError,
  });
};

export default usePostDiscussionCommentMutation;
