import { useMutation } from '@tanstack/react-query';
import type {
  PostCommentParams,
  UsePostCommentMutation,
} from '@/components/CommentSection/CommentForm/types';
import { queryClient } from '..';
import { discussionCommentKeys } from './queries/keys';
import { postDiscussionComment } from '@/apis/discussionCommentAPI';

export interface PostDiscussionCommentResponseData {
  id: number;
  discussionId: number;
  parentCommentId: number;
  content: string;
  member: {
    id: number;
    email: string;
    name: string;
    imageUrl: string;
  };
  createdAt: string;
}

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
