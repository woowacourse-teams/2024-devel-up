import { useParams, useSearchParams } from 'react-router-dom';
import useMission from '@/hooks/useMission';
import useSubmitSolution from '@/hooks/useSubmitSolution';
import useSolution from '@/hooks/useSolution';
import useUserInfo from '@/hooks/useUserInfo';
import { type SolutionPatchMutationProps, useUpdateSolution } from '@/hooks/useUpdateSolution';
import { useInitializeInputs } from './useInitializeInputs';
import { useFormSubmission } from './useFormSubmission';

export const useSubmitSolutionHandlers = () => {
  const { id } = useParams();
  const missionId = Number(id) || 0;
  const [searchParams] = useSearchParams();
  const solutionId = Number(searchParams.get('solutionId')) ?? null;

  const { data: mission } = useMission(missionId);
  const { data: solution } = useSolution(solutionId);
  const { data: userInfo } = useUserInfo();
  const { solutionPatchMutation } = useUpdateSolution(solutionId);

  const missionName = new URL(mission.url).pathname.split('/').pop() ?? '';
  const {
    solutionTitle,
    url,
    description,
    handleDescription,
    handleMarkDownDescription,
    handleUrl,
    handleSubmitSolution: handleSubmit,
    handleSolutionTitle,
    isPending,
    isModalOpen,
    isUrlError,
    isDescriptionError,
    isSolutionTitleError,
    isSubmitSolutionError,
    isValidSolutionTitle,
  } = useSubmitSolution({ missionId, missionName });

  const { title: inputTitle, url: inputUrl, description: inputDescription, member } = solution;
  const isEditMode = !!solutionId;

  // 초기값 설정 로직
  useInitializeInputs({
    isEditMode,
    userInfo,
    member,
    inputTitle,
    inputDescription,
    inputUrl,
    handleTitle: handleSolutionTitle,
    handleDescription,
    handleUrl,
  });

  // 폼 제출 로직
  const handleFormSubmit = useFormSubmission<SolutionPatchMutationProps>({
    isEditMode,
    id: solutionId,
    handleSubmit,
    patchMutation: solutionPatchMutation,
    props: {
      solutionId,
      title: solutionTitle,
      description,
      url,
    },
  });

  return {
    mission,
    missionId,
    isPending,
    isModalOpen,
    solutionTitle,
    handleSolutionTitle,
    url,
    handleUrl,
    description,
    handleMarkDownDescription,
    isSolutionTitleError,
    isValidSolutionTitle,
    isUrlError,
    isSubmitSolutionError,
    isDescriptionError,
    handleFormSubmit,
  };
};
