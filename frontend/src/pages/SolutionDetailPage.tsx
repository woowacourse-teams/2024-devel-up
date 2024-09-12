import CommentForm from '@/components/SolutionDetail/CommentForm';
import CommentList from '@/components/SolutionDetail/CommentList';
import * as S from '@/components/SolutionDetail/SolutionDetail.styled';
import usePathnameAt from '@/hooks/usePathnameAt';
import useUserInfo from '@/hooks/useUserInfo';
import { useComments } from '@/hooks/useComments';
import useSolution from '@/hooks/useSolution';
import SolutionSection from '@/components/SolutionDetail/SolutionSection';
import usePostCommentMutation from '@/hooks/usePostCommentMutation';

export default function SolutionDetailPage() {
  const { data: userInfo } = useUserInfo();
  const solutionId = Number(usePathnameAt(-1));

  const { data: solution } = useSolution(solutionId);
  const { data: comments } = useComments(solutionId);

  const hasComment = comments.length > 0;
  const isLoggedIn = Boolean(userInfo);

  return (
    <S.SolutionDetailPageContainer>
      <SolutionSection solution={solution} />
      {(hasComment || isLoggedIn) && <S.SeparationLine />}
      <CommentList comments={comments} />
      {isLoggedIn && (
        <S.CommentFormWrapper>
          <CommentForm solutionId={solutionId} usePostCommentMutation={usePostCommentMutation} />
        </S.CommentFormWrapper>
      )}
    </S.SolutionDetailPageContainer>
  );
}
