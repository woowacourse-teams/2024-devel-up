import PageButtons from '@/components/common/PageButtons';
import useDashboardDiscussion from '@/hooks/useDashboardDiscussion';
import { usePagination } from '@/hooks/usePagination';
import NoContent from '../DashBoardMissionList/NoContent';
import * as S from './DashboardDiscussion.styled';
import DiscussionItem from './DiscussionItem';
import { useDashboardLayoutContext } from '@/pages/DashboardPage/DashBoardPageLayout';

export default function DashBoardDiscussionList() {
  const { path } = useDashboardLayoutContext();

  const {
    currentPage,
    setTotalPages,
    goToPage,
    goToPreviousGroup,
    goToNextGroup,
    pageNumbers,
    hasPreviousGroup,
    hasNextGroup,
  } = usePagination();

  const { discussionList, totalPage } = useDashboardDiscussion({
    path,
    page: currentPage,
    onPageInfoUpdate: (totalPagesFromServer) => {
      setTotalPages(totalPagesFromServer);
    },
  });

  return (
    <>
      {!discussionList?.length ? (
        <NoContent type="dashboardDiscussion" />
      ) : (
        <S.Container>
          {discussionList?.map((discussion) => {
            return (
              <DiscussionItem
                key={discussion.id}
                id={discussion.id}
                hashTags={discussion?.hashTags || []}
                title={discussion.title}
                mission={discussion.mission}
                imageUrl={discussion.member?.imageUrl}
                commentCount={discussion.commentCount}
                createdAt={discussion.createdAt}
              />
            );
          })}
        </S.Container>
      )}

      {totalPage > 0 && (
        <PageButtons
          goToNextGroup={goToNextGroup}
          goToPage={goToPage}
          goToPreviousGroup={goToPreviousGroup}
          pageNumbers={pageNumbers}
          hasPreviousGroup={hasPreviousGroup}
          hasNextGroup={hasNextGroup}
          currentPage={currentPage}
        />
      )}
    </>
  );
}
