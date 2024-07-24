import MyMissionCompletedCard from './MyMissionCompletedCard';
import * as S from './MyMissionCompleted.styled';

export default function MyMissionCompleted() {
  return (
    <S.MyMissionCompletedContainer>
      <S.CompletedTitle>완료한 미션</S.CompletedTitle>
      <MyMissionCompletedCard />
    </S.MyMissionCompletedContainer>
  );
}
