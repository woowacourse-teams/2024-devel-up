import MyMissionInProgress from '@/components/myMission/myMissionInProgress/MyMissionInProgress';
import MyMissionCompleted from '@/components/myMission/myMissionCompleted/MyMissionCompleted';
import * as S from './MyMissionPage.styled';

export default function MyMissionPage() {
  return (
    <S.MyMissionPageContainer>
      <MyMissionInProgress />
      <MyMissionCompleted />
    </S.MyMissionPageContainer>
  );
}
