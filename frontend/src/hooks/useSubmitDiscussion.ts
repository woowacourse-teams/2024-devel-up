import type { FormEvent } from 'react';
import useDescription from './useDescription';
import useDiscussionTitle from './useDiscussionTitle';
import useSubmitDiscussionMutation from './useSubmitDiscussionMutation';

interface useSubmitDiscussionProps {
  missionId?: number;
  hashTagIds: number[];
}

export const useSubmitDiscussion = ({ missionId, hashTagIds }: useSubmitDiscussionProps) => {
  const {
    discussionTitle,
    handleDiscussionTitle,
    isValidDiscussionTitle,
    isDiscussionTitleError,
    setIsDiscussionTitleError,
  } = useDiscussionTitle();

  const {
    description,
    handleDescription,
    isValidDescription,
    isDescriptionError,
    setIsDescriptionError,
  } = useDescription();

  const { submitDiscussionMutation, isPending } = useSubmitDiscussionMutation();

  const handleSubmitSolution = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidDiscussionTitle) {
      setIsDiscussionTitleError(true);
      return;
    }

    if (!isValidDescription) {
      setIsDescriptionError(true);
      return;
    }

    submitDiscussionMutation({
      title: discussionTitle,
      content: description,
      missionId,
      hashTagIds,
    });
  };

  return {
    discussionTitle,
    handleDiscussionTitle,
    isValidDiscussionTitle,
    isDiscussionTitleError,
    description,
    handleDescription,
    isDescriptionError,
    handleSubmitSolution,
    isPending,
  };
};
