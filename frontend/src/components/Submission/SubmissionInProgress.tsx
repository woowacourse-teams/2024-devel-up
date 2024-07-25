import SubmissionInProgressBanner from './SubmissionInProgressBanner';
import * as S from './Submission.styled';

export default function SubmissionInProgress() {
  return (
    <S.SubmissionInProgressContainer>
      <S.Title>진행 중인 미션</S.Title>
      <SubmissionInProgressBanner />
    </S.SubmissionInProgressContainer>
  );
}
