import DiscussionList from '@/components/DiscussionList';
import * as S from './DiscussionListPage.styled';

export default function DiscussionListPage() {
  return (
    <S.DiscussionListPageContainer>
      <S.DiscussionListTitle>💬 Discussion</S.DiscussionListTitle>
      <DiscussionList />
    </S.DiscussionListPageContainer>
  );
}
