import { patchDiscussion } from '@/apis/discussionAPI';
import { useMutation } from '@tanstack/react-query';

interface DiscussionPatchMutationProps {
  discussionId: number;
  title: string;
  content: string;
  missionId?: number;
  hashTagIds: number[];
}

export const useUpdateDiscussion = () => {
  const { mutate: patchMutation } = useMutation({
    mutationFn: patchDiscussion,
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  const discussionPatchMutation = ({
    discussionId,
    title,
    content,
    missionId,
    hashTagIds,
  }: DiscussionPatchMutationProps) => {
    patchMutation({
      discussionId,
      title,
      content,
      missionId,
      hashTagIds,
    });
  };

  return { discussionPatchMutation };
};
