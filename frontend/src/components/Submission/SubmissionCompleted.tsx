import SubmissionCompletedCard from './SubmissionCompletedCard';
import * as S from './Submission.styled';

export default function SubmissionCompleted() {
  return (
    <S.SubmissionCompletedContainer>
      <S.CompletedTitle>완료한 미션</S.CompletedTitle>
      <SubmissionCompletedCard />
    </S.SubmissionCompletedContainer>
  );
}
