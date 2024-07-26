import SubmissionInProgressBanner from './SubmissionInProgressBanner';
import * as S from './Submission.styled';
import useMissionInProgress from '@/hooks/useMissionInProgress';

export default function SubmissionInProgress() {
  // TODO: 임시입니다 @프룬 
  const { data: missionInProgress } = useMissionInProgress();
  if (!missionInProgress) {
    return null;
  }
  return (
    <S.SubmissionInProgressContainer>
      <S.Title>진행 중인 미션</S.Title>
      <SubmissionInProgressBanner />
    </S.SubmissionInProgressContainer>
  );
}
