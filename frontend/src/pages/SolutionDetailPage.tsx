import CommentForm from '@/components/SolutionDetail/CommentForm';
import CommentList from '@/components/SolutionDetail/CommentList';
import * as S from '@/components/SolutionDetail/SolutionDetail.styled';
import usePathnameAt from '@/hooks/usePathnameAt';
import CommentsMock from '@/components/SolutionDetail/CommentList/CommentsMock.json';

export default function SolutionDetailPage() {
  const solutionId = Number(usePathnameAt(-1));

  return (
    <S.SolutionDetailPageContainer>
      <CommentList comments={CommentsMock} />
      <CommentForm solutionId={solutionId} />
    </S.SolutionDetailPageContainer>
  );
}
