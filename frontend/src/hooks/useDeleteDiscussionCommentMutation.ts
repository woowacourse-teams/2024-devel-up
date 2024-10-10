import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/index';
import { deleteDiscussionComment } from '@/apis/discussionCommentAPI';
import type { UseDeleteCommentMutation } from '@/components/CommentSection/CommentForm/types';

type UseDeleteDiscussionCommentMutation = UseDeleteCommentMutation<number>;

const useDeleteDiscussionCommentMutation: UseDeleteDiscussionCommentMutation = () => {
  return useMutation({
    mutationFn: deleteDiscussionComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          // note(@ryan): 추후 api 수정 후 무효화 추가할 예정입니다.
        ],
      });
    },
  });
};

export default useDeleteDiscussionCommentMutation;
