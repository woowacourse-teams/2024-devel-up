import MissionList from '@/components/MissionList';
import * as S from './MissionListPage.styled';
import useMissions from '@/hooks/useMissions';

export default function MissionListPage() {
  const { data: allMissions } = useMissions();

  return (
    <S.MissionListPageContainer>
      <S.MissionListTitle>지금 참여할 수 있는 미션</S.MissionListTitle>
      <MissionList missions={allMissions} />
    </S.MissionListPageContainer>
  );
}
