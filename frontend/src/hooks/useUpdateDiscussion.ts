import { patchDiscussion } from '@/apis/discussionAPI';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '..';
import { discussionKeys } from './queries/keys';
import { ROUTES } from '@/constants/routes';

interface DiscussionPatchMutationProps {
  discussionId: number;
  title: string;
  content: string;
  missionId?: number;
  hashTagIds: number[];
}

export const useUpdateDiscussion = (discussionId: number) => {
  const navigate = useNavigate();

  const { mutate: patchMutation } = useMutation({
    mutationFn: patchDiscussion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: discussionKeys.all });
      navigate(`${ROUTES.discussions}/${discussionId}`);
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
