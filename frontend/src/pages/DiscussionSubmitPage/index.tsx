import DiscussionSubmitHeader from '@/components/DiscussionSubmit/DiscussionSubmitHeader';
import DiscussionSubmit from '@/components/DiscussionSubmit';
import * as S from './DiscussionSubmitPage.styled';

export default function DiscussionSubmitPage() {
  return (
    <S.DiscussionSubmitPageContainer>
      <DiscussionSubmitHeader />
      <DiscussionSubmit />
    </S.DiscussionSubmitPageContainer>
  );
}
