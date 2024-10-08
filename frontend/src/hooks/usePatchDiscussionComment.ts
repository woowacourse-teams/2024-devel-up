import { useMutation } from '@tanstack/react-query';
import type {
  PatchCommentParams,
  UsePatchCommentMutation,
} from '@/components/CommentSection/CommentForm/types';
import { queryClient } from '..';
import { discussionCommentKeys } from './queries/keys';
import {
  patchDiscountComment,
  type PatchDiscussionCommentResponseData,
} from '@/apis/discussionCommentAPI';

export type UsePatchDiscussionCommentMutation =
  UsePatchCommentMutation<PatchDiscussionCommentResponseData>;

const usePatchDiscussionCommentMutation: UsePatchDiscussionCommentMutation = (
  onSuccess?: () => void,
  onError?: (error: Error) => void,
) => {
  return useMutation<PatchDiscussionCommentResponseData, Error, PatchCommentParams>({
    mutationFn: patchDiscountComment,
    onSuccess: ({ discussionId }) => {
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: [discussionCommentKeys.all(discussionId)],
      });
    },
    onError,
  });
};

export default usePatchDiscussionCommentMutation;
