import * as S from './DiscussionDetailPage.styled';
import DiscussionDetailHeader from './DiscussionDetailHeader';
import discussionMock from './discussionMock.json';
import commentsMock from './commentsMock.json';
import CommentList from '@/components/SolutionDetail/CommentList';
import useUserInfo from '@/hooks/useUserInfo';
import CommentForm from '@/components/SolutionDetail/CommentForm';
import usePostCommentMutation from '@/hooks/usePostCommentMutation';

export default function DiscussionDetailPage() {
  const { data: userInfo } = useUserInfo();
  const isLoggedIn = !userInfo;

  return (
    <S.DiscussionDetailPageContainer>
      <S.DiscussionDetailTitle>💬 Discussion</S.DiscussionDetailTitle>
      <DiscussionDetailHeader discussion={discussionMock} />
      <S.DiscussionDescription source={discussionMock.content} />

      <CommentList comments={commentsMock} />
      {isLoggedIn && <CommentForm solutionId={1} usePostCommentMutation={usePostCommentMutation} />}
    </S.DiscussionDetailPageContainer>
  );
}
