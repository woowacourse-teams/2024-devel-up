import CommentForm from '@/components/SolutionDetail/CommentForm';
import * as S from '@/components/SolutionDetail/SolutionDetail.styled';

export default function SolutionDetailPage() {
  return (
    <S.SolutionDetailPageContainer>
      <CommentForm />
    </S.SolutionDetailPageContainer>
  );
}
