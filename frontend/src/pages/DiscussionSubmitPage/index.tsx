import * as S from './DiscussionSubmitPage.style';
import DiscussionSubmit from '@/components/DiscussionSubmit';

export default function DiscussionSubmitPage() {
  return (
    <S.DiscussionSubmitPageContainer>
      <S.DiscussionSubmitTitle>💬 Discussion</S.DiscussionSubmitTitle>
      <DiscussionSubmit />
    </S.DiscussionSubmitPageContainer>
  );
}
