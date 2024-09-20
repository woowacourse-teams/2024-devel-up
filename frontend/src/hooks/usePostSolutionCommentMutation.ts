import { useMutation } from '@tanstack/react-query';
import type {
  PostCommentParams,
  UsePostCommentMutation,
} from '@/components/CommentSection/CommentForm/types';
import { queryClient } from '..';
import { solutionCommentKeys } from './queries/keys';
import { postSolutionComment } from '@/apis/solutionCommentAPI';

export interface PostSolutionCommentResponseData {
  id: number;
  solutionId: number;
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
