import * as S from './MyComments.styled';
import NoContent from '../DashBoardMissionList/NoContent';
import MyComment from './MyComment';
import useMyComments from '@/hooks/useMyComments';
import PageButtons from '@/components/common/PageButtons';
import { usePagination } from '@/hooks/usePagination';

export default function MyCommentList() {
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
  const { myComments } = useMyComments({
    page: currentPage,
    onPageInfoUpdate: (totalPagesFromServer) => {
      setTotalPages(totalPagesFromServer);
    },
  });

  return (
    <>
      {!myComments.length ? (
        <NoContent type="comments" />
      ) : (
        <S.Container>
          {myComments.map((comment) => {
            return (
              <MyComment
                key={comment.id}
                type={'solutions'}
                contentId={comment.solutionId}
                contentTitle={comment.solutionTitle}
                createdAt={comment.createdAt}
                content={comment.content}
                contentCommentCount={comment.solutionCommentCount}
              />
            );
          })}
        </S.Container>
      )}

      {myComments.length > 0 && (
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
