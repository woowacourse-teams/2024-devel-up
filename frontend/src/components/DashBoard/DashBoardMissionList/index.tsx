import type { MissionInProgress } from '@/types/mission';
import Mission from '../../Mission';
import * as S from '@/components/Mission/Mission.styled';
import NoContent from './NoContent';

interface DashBoardMissionListProps {
  missionList: MissionInProgress[];
}

export default function DashBoardMissionList({ missionList }: DashBoardMissionListProps) {
  return (
    <>
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
    </>
  );
}
