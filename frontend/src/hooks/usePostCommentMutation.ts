import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import {
  postComment,
  type PostCommentParams,
  type PostCommentResponseData,
} from '@/apis/commentAPI';
import { queryClient } from '..';
import { commentKeys } from './queries/keys';

export type UsePostCommentMutation = (
  onSuccess?: () => void,
  onError?: (error: Error) => void,
) => UseMutationResult<PostCommentResponseData, Error, PostCommentParams>;

const usePostCommentMutation: UsePostCommentMutation = (
  onSuccess?: () => void,
  onError?: (error: Error) => void,
) => {
  return useMutation<PostCommentResponseData, Error, PostCommentParams>({
    mutationFn: postComment,
    onSuccess: ({ solutionId }) => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: commentKeys.all(solutionId) });
    },
    onError,
  });
};

export default usePostCommentMutation;
