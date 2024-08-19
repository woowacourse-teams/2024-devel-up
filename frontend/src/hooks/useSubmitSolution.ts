import useUrl from './useUrl';
import useDescription from './useDescription';
import useSubmitSolutionMutation from './useSubmitSolutionMutation';
import useModal from './useModal';
import type { FormEvent } from 'react';
import useSolutionTitle from './useSolutionTitle';
import extractMissionName from '@/utils/extractMissionName';

interface UseSubmitSolutionParams {
  missionId: number;
  missionName: string;
}

const useSubmitSolution = ({ missionId, missionName }: UseSubmitSolutionParams) => {
  const { url, handleUrl, isValidUrl, isUrlError, setIsUrlError } = useUrl();
  const isMatchedMissionName = missionName === extractMissionName(url);

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
  const { submitSolutionMutation, isPending } = useSubmitSolutionMutation({
    onSuccessCallback: handleModalOpen,
    missionId,
  });

  const handleSubmitSolution = (e: FormEvent<HTMLFormElement>) => {
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

    submitSolutionMutation({ missionId, title: solutionTitle, url, description });
  };

  return {
    url,
    description,
    solutionTitle,
    handleDescription,
    handleUrl,
    handleSubmitSolution,
    handleSolutionTitle,
    isPending,
    isModalOpen,
    isUrlError,
    isDescriptionError,
    isSolutionTitleError,
    isMatchedMissionName,
  };
};

export default useSubmitSolution;
