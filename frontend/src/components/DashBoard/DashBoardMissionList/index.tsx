import Mission from '../../Mission';
import * as S from '@/components/Mission/Mission.styled';
import NoContent from './NoContent';
import useMissionInProgress from '@/hooks/useMissionInProgress';
import { usePagination } from '@/hooks/usePagination';
import PageButtons from '@/components/common/PageButtons';
import SpinnerSuspense from '@/components/common/SpinnerSuspense';

export default function DashBoardMissionList() {
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
  const { missionList, totalPage } = useMissionInProgress({
    page: currentPage,
    onPageInfoUpdate: (totalPagesFromServer) => {
      setTotalPages(totalPagesFromServer);
    },
  });

  return (
    <>
      <SpinnerSuspense />
      {!missionList.length ? (
        <NoContent type="inProgress" />
      ) : (
        <S.MissionListContainer>
          {missionList.map((mission) => {
            return (
              <Mission key={mission.id} id={mission.id} type="mission">
                <Mission.Thumbnail thumbnail={mission.thumbnail} />
                <Mission.InfoWrapper>
                  <Mission.Title>{mission.title}</Mission.Title>
                  <Mission.Summary>{mission.summary}</Mission.Summary>
                  <Mission.HashTag hashTagList={mission.hashTags} />
                </Mission.InfoWrapper>
              </Mission>
            );
          })}
        </S.MissionListContainer>
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
