import { useMutation } from '@tanstack/react-query';
import {
  postComment,
  type PostCommentParams,
  type PostCommentResponseData,
} from '@/apis/commentAPI';

const usePostCommentMutation = (onSuccess?: () => void, onError?: (error: Error) => void) => {
  return useMutation<PostCommentResponseData, Error, PostCommentParams>({
    mutationFn: postComment,
    onSuccess,
    onError,
  });
};

export default usePostCommentMutation;
