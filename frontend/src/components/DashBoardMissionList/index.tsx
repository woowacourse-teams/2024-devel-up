import type { MissionInProgress } from '@/types/mission';
import Mission from '../Mission';
import * as S from './DashBoardMissionList.styled';

interface DashBoardMissionListProps {
  missionList: MissionInProgress[];
}

export default function DashBoardMissionList({ missionList }: DashBoardMissionListProps) {
  return (
    <S.MissionListContainer>
      {missionList.map((mission) => {
        return (
          <Mission key={mission.id}>
            <Mission.Card id={mission.id}>
              <Mission.Thumbnail thumbnail={mission.thumbnail} />
              <Mission.InfoWrapper>
                <Mission.Title>{mission.title}</Mission.Title>
                <Mission.Summary>{mission.summary}</Mission.Summary>
                <Mission.HashTag hashtagList={mission.hashtag} />
              </Mission.InfoWrapper>
            </Mission.Card>
          </Mission>
        );
      })}
    </S.MissionListContainer>
  );
}
