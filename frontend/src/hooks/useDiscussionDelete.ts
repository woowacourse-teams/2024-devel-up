import { deleteDiscussion } from '@/apis/discussionAPI';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '..';
import { discussionKeys } from './queries/keys';

export const useDiscussionDelete = () => {
  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: (discussionId: number) => deleteDiscussion(discussionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: discussionKeys.all });
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  const discussionDeleteMutation = async (discussionId: number, onSuccessCallback?: () => void) => {
    await deleteMutation(discussionId);
    if (onSuccessCallback) onSuccessCallback();
  };

  return { discussionDeleteMutation };
};
