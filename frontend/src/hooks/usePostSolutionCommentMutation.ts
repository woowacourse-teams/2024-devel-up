import { useMutation } from '@tanstack/react-query';
import type { UsePostCommentMutation } from '@/components/CommentSection/CommentForm/types';
import { queryClient } from '..';
import { solutionCommentKeys } from './queries/keys';
import {
  postSolutionComment,
  type PostSolutionCommentResponseData,
} from '@/apis/solutionCommentAPI';
import type { PostCommentParams } from '@/components/CommentSection/CommentForm/types';

export type UsePostSolutionCommentMutation =
  UsePostCommentMutation<PostSolutionCommentResponseData>;

const usePostSolutionCommentMutation: UsePostSolutionCommentMutation = (
  onSuccess?: () => void,
  onError?: (error: Error) => void,
) => {
  return useMutation<PostSolutionCommentResponseData, Error, PostCommentParams>({
    mutationFn: postSolutionComment,
    onSuccess: ({ solutionId }) => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: solutionCommentKeys.all(solutionId) });
    },
    onError,
  });
};

export default usePostSolutionCommentMutation;
