import MyMissionInProgress from '@/components/MyMission/MyMissionInProgress/MyMissionInProgress';
import MyMissionCompleted from '@/components/MyMission/MyMissionCompleted/MyMissionCompleted';
import * as S from './MyMissionPage.styled';

export default function MyMissionPage() {
  return (
    <S.MyMissionPageContainer>
      <MyMissionInProgress />
      <MyMissionCompleted />
    </S.MyMissionPageContainer>
  );
}
