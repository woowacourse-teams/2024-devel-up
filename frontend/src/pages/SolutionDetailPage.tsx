import CommentForm from '@/components/SolutionDetail/CommentForm';
import CommentList from '@/components/SolutionDetail/CommentList';
import * as S from '@/components/SolutionDetail/SolutionDetail.styled';
import usePathnameAt from '@/hooks/usePathnameAt';
import useUserInfo from '@/hooks/useUserInfo';
import { useComments } from '@/hooks/useComments';

export default function SolutionDetailPage() {
  const { data: userInfo } = useUserInfo();
  const solutionId = Number(usePathnameAt(-1));
  const { data: comments } = useComments(solutionId);

  return (
    <S.SolutionDetailPageContainer>
      <CommentList comments={comments} />
      {userInfo && (
        <S.CommentFormWrapper>
          <CommentForm solutionId={solutionId} />
        </S.CommentFormWrapper>
      )}
    </S.SolutionDetailPageContainer>
  );
}
