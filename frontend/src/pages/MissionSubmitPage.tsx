import MissionImage from '@/components/MissionSubmit/MissionThumbnail';
import * as S from './MissionSubmitPage.styled';
import SubmitBanner from '@/components/MissionSubmit/SubmitBanner';
import PRLink from '@/components/MissionSubmit/PRLink';
import OneWord from '@/components/MissionSubmit/OneWord';
import SubmitButton from '@/components/MissionSubmit/SubmitButton';
import SubmitSuccessPopUp from '@/components/PopUp/SubmitSuccessPopUp';
import { useParams } from 'react-router-dom';
import useMission from '@/hooks/useMission';
import { PROGRESS_MESSAGE } from '@/constants/messages';
import useSubmission from '@/hooks/useSubmission';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import MissionTitle from '@/components/MissionSubmit/MissionTitle';

export default function MissionSubmitPage() {
  const { id } = useParams();
  const missionId = Number(id) || 0;
  const { data: mission } = useMission(missionId);
  const {
    solutionTitle,
    url,
    description,
    handleDescription,
    handleUrl,
    handleSubmission,
    handleSolutionTitle,
    isPending,
    isModalOpen,
    isUrlError,
    isDescriptionError,
    isSolutionTitleError,
  } = useSubmission({ missionId, title: mission.title });

  return (
    <S.Container>
      {isPending && <LoadingSpinner />}
      <SubmitBanner />
      <MissionImage
        thumbnail={mission.thumbnail}
        title={mission.title}
        language={mission.language}
      />
      <form onSubmit={handleSubmission}>
        <MissionTitle
          value={solutionTitle}
          onChange={handleSolutionTitle}
          danger={isSolutionTitleError}
        />
        <PRLink value={url} onChange={handleUrl} missionId={missionId} danger={isUrlError} />
        <OneWord
          danger={isDescriptionError}
          value={description ?? ''}
          onChange={handleDescription}
          placeholder={PROGRESS_MESSAGE.solution_description}
        />
        <SubmitButton />
      </form>

      <SubmitSuccessPopUp isModalOpen={isModalOpen} thumbnail={mission.thumbnail} />
    </S.Container>
  );
}
