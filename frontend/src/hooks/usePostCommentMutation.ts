import { useMutation } from '@tanstack/react-query';
import {
  postComment,
  type PostCommentParams,
  type PostCommentResponseData,
} from '@/apis/commentAPI';
import { queryClient } from '..';
import { commentKeys } from './queries/keys';

const usePostCommentMutation = (onSuccess?: () => void, onError?: (error: Error) => void) => {
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
