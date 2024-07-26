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

export default function MissionSubmitPage() {
  const { id } = useParams();
  const missionId = Number(id) || 0;
  const { data: mission } = useMission(missionId);
  const {
    url,
    comment,
    handleComment,
    handleUrl,
    handleSubmission,
    isPending,
    isModalOpen,
    isUrlError,
    isCommentError,
  } = useSubmission({ missionId });

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
        <PRLink value={url} onChange={handleUrl} missionId={missionId} danger={isUrlError} />
        <OneWord
          danger={isCommentError}
          value={comment ?? ''}
          onChange={handleComment}
          placeholder={PROGRESS_MESSAGE.review_one_word}
        />
        <SubmitButton />
      </form>

      <SubmitSuccessPopUp isModalOpen={isModalOpen} thumbnail={mission.thumbnail} />
    </S.Container>
  );
}
