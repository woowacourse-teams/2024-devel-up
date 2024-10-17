import NoContent from '../DashBoardMissionList/NoContent';
import Mission from '@/components/Mission';
import * as S from '@/components/Mission/Mission.styled';
import useSubmittedSolutions from '@/hooks/useSubmittedSolutions';
import { formatDateString } from '@/utils/formatDateString';
import { usePagination } from '@/hooks/usePagination';
import PageButtons from '@/components/common/PageButtons';

export default function SubmittedSolutionList() {
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
  // const { missionList } = useMissionInProgress({
  //   page: currentPage,
  //   onPageInfoUpdate: (totalPagesFromServer) => {
  //     setTotalPages(totalPagesFromServer);
  //   },
  // });

  const { submittedSolutionList } = useSubmittedSolutions({
    page: currentPage,
    onPageInfoUpdate: (totalPagesFromServer) => {
      setTotalPages(totalPagesFromServer);
    },
  });

  return (
    <>
      {!submittedSolutionList.length ? (
        <NoContent type="submitted" />
      ) : (
        <S.MissionListContainer>
          {submittedSolutionList.map((mission) => {
            return (
              <Mission key={mission.id} id={mission.id} type="solution">
                <Mission.Thumbnail thumbnail={mission.thumbnail} />
                <Mission.InfoWrapper>
                  <Mission.Title>{mission.title}</Mission.Title>
                  <Mission.Summary>{formatDateString(mission.createdAt)}</Mission.Summary>
                </Mission.InfoWrapper>
              </Mission>
            );
          })}
        </S.MissionListContainer>
      )}
      {submittedSolutionList.length > 0 && (
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
