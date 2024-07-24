import MyMissionInProgress from '@/components/MyMission/MyMissionInProgress/MyMissionInProgress';
import * as S from './MyMissionPage.styled';
import MyMissionCompleted from '@/components/MyMission/MyMissionCompleted/MyMissionCompleted';

export default function MyMissionPage() {
  return (
    <S.MyMissionPageContainer>
      <MyMissionInProgress />
      <MyMissionCompleted />
    </S.MyMissionPageContainer>
  );
}
