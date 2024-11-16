import { useState } from 'react';
import { useInitializeInputs } from './useInitializeInputs';
import { useFormSubmission } from './useFormSubmission';
import useDiscussion from '@/hooks/useDiscussion';
import useUserInfo from '@/hooks/useUserInfo';
import useHashTags from '@/hooks/useHashTags';
import useMissions from '@/hooks/useMissions';
import {
  type DiscussionPatchMutationProps,
  useUpdateDiscussion,
} from '@/hooks/useUpdateDiscussion';
import { useSubmitDiscussion } from '@/hooks/useSubmitDiscussion';
import type { HashTag } from '@/types';
import { useSearchParams } from 'react-router-dom';

export const useSubmitDiscussionHandlers = () => {
  const [searchParams] = useSearchParams();
  const discussionId = Number(searchParams.get('discussionId')) ?? null;

  const { data: userInfo } = useUserInfo();
  const { data: allHashTags } = useHashTags();
  const { missions } = useMissions();

  const [selectedHashTags, setSelectedHashTags] = useState<HashTag[]>([]);
  const [selectedMission, setSelectedMission] = useState<{ id: number; title: string } | null>(
    null,
  );

  const { data: discussion } = useDiscussion(discussionId);
  const { discussionPatchMutation } = useUpdateDiscussion(discussionId || 0);

  const {
    description,
    discussionTitle,
    isDiscussionTitleError,
    isValidDiscussionTitle,
    handleDiscussionTitle,
    handleMarkDownDescription,
    isDescriptionError,
    handleDescription,
    handleSubmitDiscussion,
  } = useSubmitDiscussion({
    hashTagIds: selectedHashTags.map((tag) => tag.id),
    missionId: selectedMission?.id,
  });

  const { title: inputTitle, content: inputContent, member } = discussion || {};

  // 초기값 설정 로직
  useInitializeInputs({
    isEditMode: !!discussionId,
    userInfo,
    member,
    inputTitle,
    inputDescription: inputContent,
    inputUrl: '',
    handleTitle: handleDiscussionTitle,
    handleDescription,
    handleUrl: () => {},
  });

  // 폼 제출 로직
  const handleFormSubmit = useFormSubmission<DiscussionPatchMutationProps>({
    isEditMode: !!discussionId,
    id: discussionId || 0,
    handleSubmit: handleSubmitDiscussion,
    patchMutation: (props: DiscussionPatchMutationProps) => discussionPatchMutation(props),
    props: {
      discussionId: discussionId || 0,
      content: description,
      hashTagIds: selectedHashTags.map((tag) => tag.id),
      missionId: selectedMission?.id,
      title: discussionTitle,
    },
  });

  return {
    missions,
    allHashTags,
    selectedHashTags,
    setSelectedHashTags,
    selectedMission,
    setSelectedMission,
    discussionTitle,
    description,
    handleDiscussionTitle,
    handleMarkDownDescription,
    isDiscussionTitleError,
    isValidDiscussionTitle,
    isDescriptionError,
    handleFormSubmit,
  };
};
