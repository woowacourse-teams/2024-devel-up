import useUrl from './useUrl';
import useDescription from './useDescription';
import useSubmissionMutation from './useSubmissionMutation';
import useModal from './useModal';
import type { FormEvent } from 'react';
import useSolutionTitle from './useSolutionTitle';

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
  const {
    solutionTitle,
    isSolutionTitleError,
    setIsSolutionTitleError,
    handleSolutionTitle,
    isValidSolutionTitle,
  } = useSolutionTitle();
  const { handleModalOpen, isModalOpen } = useModal();
  const { submissionMutation, isPending } = useSubmissionMutation({
    onSuccessCallback: handleModalOpen,
  });

  const handleSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidSolutionTitle) {
      setIsSolutionTitleError(true);
      return;
    }

    if (!isValidUrl) {
      setIsUrlError(true);
      return;
    }
    if (!isValidDescription) {
      setIsDescriptionError(true);
      return;
    }

    submissionMutation({ missionId, title: solutionTitle, url, description });
  };

  return {
    url,
    description,
    solutionTitle,
    handleDescription,
    handleUrl,
    handleSubmission,
    handleSolutionTitle,
    isPending,
    isModalOpen,
    isUrlError,
    isDescriptionError,
    isSolutionTitleError,
  };
};

export default useSubmission;
