import { deleteDiscussion } from '@/apis/discussionAPI';
import { useMutation } from '@tanstack/react-query';

export const useDiscussionDelete = () => {
  const { mutate: deleteMutation } = useMutation({
    mutationFn: (discussionId: number) => deleteDiscussion(discussionId),
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  const discussionDeleteMutation = (discussionId: number) => {
    deleteMutation(discussionId);
  };

  return { discussionDeleteMutation };
};
