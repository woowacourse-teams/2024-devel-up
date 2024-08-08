import useUrl from './useUrl';
import useDescription from './useDescription';
import useSubmissionMutation from './useSubmissionMutation';
import useModal from './useModal';
import type { FormEvent } from 'react';

interface UseSubmissionParams {
  missionId: number;
  title: string;
}

const useSubmission = ({ missionId, title }: UseSubmissionParams) => {
  const { url, handleUrl, isValidUrl, isUrlError, setIsUrlError } = useUrl();
  const {
    description,
    handleDescription,
    isValidDescription,
    isDescriptionError,
    setIsDescriptionError,
  } = useDescription();
  const { handleModalOpen, isModalOpen } = useModal();
  const { submissionMutation, isPending } = useSubmissionMutation({
    onSuccessCallback: handleModalOpen,
  });

  const handleSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidUrl) {
      setIsUrlError(true);
      return;
    }
    if (!isValidDescription) {
      setIsDescriptionError(true);
      return;
    }
    submissionMutation({ missionId, title, url, description });
  };

  return {
    url,
    description,
    handleDescription,
    handleUrl,
    handleSubmission,
    isPending,
    isModalOpen,
    isUrlError,
    isDescriptionError,
  };
};

export default useSubmission;
