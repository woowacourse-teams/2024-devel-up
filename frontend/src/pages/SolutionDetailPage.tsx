import CommentForm from '@/components/SolutionDetail/CommentForm';
import CommentList from '@/components/SolutionDetail/CommentList';
import * as S from '@/components/SolutionDetail/SolutionDetail.styled';
import usePathnameAt from '@/hooks/usePathnameAt';
import CommentsMock from '@/components/SolutionDetail/CommentList/CommentsMock.json';
import useUserInfo from '@/hooks/useUserInfo';

export default function SolutionDetailPage() {
  const { data: userInfo } = useUserInfo();
  const solutionId = Number(usePathnameAt(-1));

  return (
    <S.SolutionDetailPageContainer>
      <CommentList comments={CommentsMock} />
      {userInfo && <CommentForm solutionId={solutionId} />}
    </S.SolutionDetailPageContainer>
  );
}
