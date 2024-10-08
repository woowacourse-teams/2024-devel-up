import { useMutation } from '@tanstack/react-query';
import type {
  PatchCommentParams,
  UsePatchCommentMutation,
} from '@/components/CommentSection/CommentForm/types';
import { queryClient } from '..';
import { solutionCommentKeys } from './queries/keys';
import {
  patchSolutionComment,
  type PatchSolutionCommentResponseData,
} from '@/apis/solutionCommentAPI';

export type UsePatchSolutionCommentMutation =
  UsePatchCommentMutation<PatchSolutionCommentResponseData>;

const usePatchSolutionCommentMutation: UsePatchSolutionCommentMutation = (
  onSuccess?: () => void,
  onError?: (error: Error) => void,
) => {
  return useMutation<PatchSolutionCommentResponseData, Error, PatchCommentParams>({
    mutationFn: patchSolutionComment,
    onSuccess: ({ solutionId }) => {
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: [solutionCommentKeys.all(solutionId)],
      });
    },
    onError,
  });
};

export default usePatchSolutionCommentMutation;
