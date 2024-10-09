import * as S from './SolutionDetailPage.styled';
import usePathnameAt from '@/hooks/usePathnameAt';
import useUserInfo from '@/hooks/useUserInfo';
import { useSolutionComments } from '@/hooks/useSolutionComments';
import useSolution from '@/hooks/useSolution';
import SolutionSection from '@/components/SolutionDetail';
import usePostSolutionCommentMutation from '@/hooks/usePostSolutionCommentMutation';
import CommentSection from '@/components/CommentSection';
import useDeleteSolutionCommentMutation from '@/hooks/useDeleteSolutionCommentMutation';
import usePatchSolutionCommentMutation from '@/hooks/usePatchSolutionComment';

export default function SolutionDetailPage() {
  const { data: userInfo } = useUserInfo();
  const solutionId = Number(usePathnameAt(-1));

  const { data: solution } = useSolution(solutionId);
  const { data: comments } = useSolutionComments(solutionId);

  const isLoggedIn = Boolean(userInfo);

  return (
    <S.SolutionDetailPageContainer>
      <SolutionSection solution={solution} />

      <CommentSection
        comments={comments}
        postId={solutionId}
        usePostCommentMutation={usePostSolutionCommentMutation}
        usePatchCommentMutation={usePatchSolutionCommentMutation}
        useDeleteCommentMutation={useDeleteSolutionCommentMutation}
        isLoggedIn={isLoggedIn}
      />
    </S.SolutionDetailPageContainer>
  );
}
