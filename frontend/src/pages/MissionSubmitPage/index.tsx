import * as S from './MissionSubmitPage.styled';
import SubmitBanner from '@/components/MissionSubmit/SubmitBanner';
import PRLink from '@/components/MissionSubmit/PRLink';
import OneWord from '@/components/MissionSubmit/OneWord';
import SubmitButton from '@/components/MissionSubmit/SubmitButton';
import SubmitSuccessPopUp from '@/components/PopUp/SubmitSuccessPopUp';
import { ERROR_MESSAGE } from '@/constants/messages';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import MissionTitle from '@/components/MissionSubmit/MissionTitle';
import { useSubmitSolutionHandlers } from '@/hooks/useSubmitSolutionHandlers';

export default function MissionSubmitPage() {
  const {
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
  } = useSubmitSolutionHandlers();

  return (
    <S.Container>
      {isPending && <LoadingSpinner />}
      <S.Wrapper>
        <SubmitBanner mission={mission} />
        <form onSubmit={handleFormSubmit}>
          <MissionTitle
            value={solutionTitle}
            onChange={handleSolutionTitle}
            danger={isSolutionTitleError || !isValidSolutionTitle}
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
      </S.Wrapper>

      <SubmitSuccessPopUp isModalOpen={isModalOpen} thumbnail={mission.thumbnail} />
    </S.Container>
  );
}
