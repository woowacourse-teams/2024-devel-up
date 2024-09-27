import * as S from './DiscussionSubmitPage.style';
import DiscussionSubmit from '@/components/DiscussionSubmit';

export default function DiscussionSubmitPage() {
  return (
    <S.DiscussionSubmitPageContainer>
      <S.DiscussionSubmitTitle>💬 디스커션</S.DiscussionSubmitTitle>
      <DiscussionSubmit />
    </S.DiscussionSubmitPageContainer>
  );
}
