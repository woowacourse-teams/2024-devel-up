import useUrl from './useUrl';
import useDescription from './useDescription';
import useSubmitSolutionMutation from './useSubmitSolutionMutation';
import useModal from './useModal';
import type { FormEvent } from 'react';
import useSolutionTitle from './useSolutionTitle';
// import extractMissionName from '@/utils/extractMissionName';

interface UseSubmitSolutionParams {
  missionId: number;
  missionName: string;
}

const useSubmitSolution = ({ missionId }: UseSubmitSolutionParams) => {
  const { url, handleUrl, isValidUrl, isUrlError, setIsUrlError } = useUrl();

  //TODO 임시 주석 처리
  // const isMatchedMissionName = missionName === extractMissionName(url);

  const {
    description,
    handleDescription,
    handleMarkDownDescription,
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
  const { submitSolutionMutation, isPending, isSubmitSolutionError } = useSubmitSolutionMutation({
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
    handleMarkDownDescription,
    handleUrl,
    handleSubmitSolution,
    handleSolutionTitle,
    isPending,
    isModalOpen,
    isUrlError,
    isValidUrl,
    isValidDescription,
    isValidSolutionTitle,
    isDescriptionError,
    isSolutionTitleError,
    isSubmitSolutionError,
    // isMatchedMissionName,
  };
};

export default useSubmitSolution;
