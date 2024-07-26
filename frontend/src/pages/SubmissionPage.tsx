import SubmissionInProgress from '@/components/Submission/SubmissionInProgress';
import * as S from './SubmissionPage.styled';
import SubmissionCompleted from '@/components/Submission/SubmissionCompleted';

export default function SubmissionPage() {
  return (
    <S.SubmissionPageContainer>
      <SubmissionInProgress />
      <SubmissionCompleted />
    </S.SubmissionPageContainer>
  );
}
