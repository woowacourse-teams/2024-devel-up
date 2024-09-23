import DiscussionListContent from '@/components/DiscussionList/DiscussionListContent';
import * as S from './DiscussionListPage.styled';
import DiscussionListHeader from '@/components/DiscussionList/DiscussionListHeader';

export default function DiscussionListPage() {
  return (
    <S.DiscussionListPageContainer>
      <DiscussionListHeader />
      <DiscussionListContent />
    </S.DiscussionListPageContainer>
  );
}
