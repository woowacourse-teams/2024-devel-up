import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/index';
import type { UseDeleteCommentMutation } from '@/components/CommentSection/CommentForm/types';
import { deleteSolutionComment } from '@/apis/solutionCommentAPI';

type UseDeleteSolutionCommentMutation = UseDeleteCommentMutation<number>;

const useDeleteSolutionCommentMutation: UseDeleteSolutionCommentMutation = () => {
  return useMutation({
    mutationFn: deleteSolutionComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          // note(@ryan): 추후 api 수정 후 무효화 추가할 예정입니다.
        ],
      });
    },
  });
};

export default useDeleteSolutionCommentMutation;
