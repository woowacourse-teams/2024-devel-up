import NoContent from '../DashBoardMissionList/NoContent';
import Mission from '@/components/Mission';
import * as S from '@/components/Mission/Mission.styled';
import useSubmittedSolutions from '@/hooks/useSubmittedSolutions';

export default function SubmittedSolutionList() {
  const { data: submittedSolutionList } = useSubmittedSolutions();

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
                  <Mission.Summary>{mission.createdAt}</Mission.Summary>
                </Mission.InfoWrapper>
              </Mission>
            );
          })}
        </S.MissionListContainer>
      )}
    </>
  );
}
