import * as S from './DiscussionDetailPage.styled';
import DiscussionDetailHeader from './DiscussionDetailHeader';
import discussionMock from './mock.json';

export default function DiscussionDetailPage() {
  return (
    <S.DiscussionDetailPageContainer>
      <S.DiscussionDetailTitle>💬 Discussion</S.DiscussionDetailTitle>
      <DiscussionDetailHeader discussion={discussionMock} />
      <S.DiscussionDescription source={discussionMock.content} />
    </S.DiscussionDetailPageContainer>
  );
}
