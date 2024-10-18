import * as S from './MissionSubmitPage.styled';
import SubmitBanner from '@/components/MissionSubmit/SubmitBanner';
import PRLink from '@/components/MissionSubmit/PRLink';
import OneWord from '@/components/MissionSubmit/OneWord';
import SubmitButton from '@/components/MissionSubmit/SubmitButton';
import SubmitSuccessPopUp from '@/components/PopUp/SubmitSuccessPopUp';
import { useParams, useSearchParams } from 'react-router-dom';
import useMission from '@/hooks/useMission';
import { ERROR_MESSAGE } from '@/constants/messages';
import useSubmitSolution from '@/hooks/useSubmitSolution';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import MissionTitle from '@/components/MissionSubmit/MissionTitle';
import useUserInfo from '@/hooks/useUserInfo';
import { useEffect } from 'react';
import { useUpdateSolution } from '@/hooks/useUpdateSolution';
import useSolution from '@/hooks/useSolution';

export default function MissionSubmitPage() {
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
    handleSubmitSolution,
    handleSolutionTitle,
    isPending,
    isModalOpen,
    isUrlError,
    isDescriptionError,
    isSolutionTitleError,
    isSubmitSolutionError,
    // isMatchedMissionName,
  } = useSubmitSolution({ missionId, missionName });

  const { title: inputTitle, url: inputUrl, description: inputDescription, member } = solution;
  const isEditMode = !!solutionId;

  // 글을 수정하는 경우 input의 초기값을 해당 값으로 변경
  useEffect(() => {
    if (isEditMode && member?.id === userInfo?.id) {
      if (inputTitle)
        handleSolutionTitle({
          target: { value: inputTitle },
        } as React.ChangeEvent<HTMLInputElement>);
      if (inputDescription)
        handleDescription({
          target: { value: inputDescription },
        } as React.ChangeEvent<HTMLTextAreaElement>);
      if (inputUrl)
        handleUrl({ target: { value: inputUrl } } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [isEditMode, inputTitle, inputDescription, inputUrl, member?.id, userInfo?.id]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEditMode && solutionId) {
      solutionPatchMutation({
        solutionId,
        title: solutionTitle,
        description,
        url,
      });
    } else {
      handleSubmitSolution(e);
    }
  };

  return (
    <S.Container>
      {isPending && <LoadingSpinner />}
      <SubmitBanner mission={mission} />
      <form onSubmit={handleFormSubmit}>
        <MissionTitle
          value={solutionTitle}
          onChange={handleSolutionTitle}
          danger={isSolutionTitleError}
        />
        <PRLink
          value={url}
          onChange={handleUrl}
          missionId={missionId}
          danger={isUrlError || isSubmitSolutionError}
        />
        <OneWord
          danger={isDescriptionError}
          dangerMessage={ERROR_MESSAGE.no_content}
          value={description ?? ''}
          onChange={handleMarkDownDescription}
        />
        <SubmitButton />
      </form>

      <SubmitSuccessPopUp isModalOpen={isModalOpen} thumbnail={mission.thumbnail} />
    </S.Container>
  );
}
