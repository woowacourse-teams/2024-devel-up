import MissionItem from '@/components/missionList/MissionItem';
import * as S from '@/components/missionList/MissionList.styled';
import { missionMocks } from '@/components/missionList/missionMocks';

export default function MissionListPage() {
  return (
    <S.MissionListContainer>
      <S.MissionListTitle>미션 풀고 리뷰 받고, Devel Up! 🚀</S.MissionListTitle>
      <S.MissionList>
        {missionMocks.map((mission) => (
          <MissionItem key={mission.id} mission={mission} />
        ))}
      </S.MissionList>
    </S.MissionListContainer>
  );
}
