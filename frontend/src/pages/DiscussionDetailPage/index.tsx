import * as S from './DiscussionDetailPage.styled';
import DiscussionDetailHeader from './DiscussionDetailHeader';
import discussionMock from './discussionMock.json';
import commentsMock from './commentsMock.json';
import useUserInfo from '@/hooks/useUserInfo';
import usePostDiscussionCommentMutation from '@/hooks/usePostDiscussionCommentMutation';
import CommentSection from '@/components/CommentSection';

export default function DiscussionDetailPage() {
  const { data: userInfo } = useUserInfo();
  const isLoggedIn = Boolean(userInfo);

  return (
    <S.DiscussionDetailPageContainer>
      <S.DiscussionDetailTitle>💬 Discussion</S.DiscussionDetailTitle>
      <DiscussionDetailHeader discussion={discussionMock} />
      <S.DiscussionDescription source={discussionMock.content} />
      <CommentSection
        comments={commentsMock}
        postId={1}
        usePostCommentMutation={usePostDiscussionCommentMutation}
        isLoggedIn={isLoggedIn}
      />
    </S.DiscussionDetailPageContainer>
  );
}
