import NoContent from '../DashBoardMissionList/NoContent';
import MyComment from '../MyComments/MyComment';
import * as S from '../MyComments/MyComments.styled';
import useDashboardDiscussionComment from '@/hooks/useDashboardDiscussionComment';
import { usePagination } from '@/hooks/usePagination';
import PageButtons from '@/components/common/PageButtons';
import { useDashboardLayoutContext } from '@/pages/DashboardPage/DashBoardPageLayout';

export default function DiscussionCommentList() {
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
  const { discussionCommentList, totalPage } = useDashboardDiscussionComment({
    path,
    page: currentPage,
    onPageInfoUpdate: (totalPagesFromServer) => {
      setTotalPages(totalPagesFromServer);
    },
  });

  return (
    <>
      {!discussionCommentList.length ? (
        <NoContent type="comments" />
      ) : (
        <S.Container>
          {discussionCommentList.map((discussionComment) => {
            return (
              <MyComment
                key={discussionComment.id}
                type="discussions"
                contentId={discussionComment.discussionId}
                contentTitle={discussionComment.discussionTitle}
                createdAt={discussionComment.createdAt}
                content={discussionComment.content}
                contentCommentCount={discussionComment.discussionCommentCount}
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
