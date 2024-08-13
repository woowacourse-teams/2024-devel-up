import CommentForm from '@/components/SolutionDetail/CommentForm';
import * as S from '@/components/SolutionDetail/SolutionDetail.styled';
import usePathnameAt from '@/hooks/usePathnameAt';

export default function SolutionDetailPage() {
  const solutionId = Number(usePathnameAt(-1));

  return (
    <S.SolutionDetailPageContainer>
      <CommentForm solutionId={solutionId} />
    </S.SolutionDetailPageContainer>
  );
}
