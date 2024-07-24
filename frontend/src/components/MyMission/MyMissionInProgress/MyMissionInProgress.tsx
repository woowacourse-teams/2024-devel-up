import MyMissionInProgressBanner from './MyMissionInProgressBanner';
import * as S from './MyMissionInProgress.styled';

export default function MyMissionInProgress() {
  return (
    <S.MyMissionInProgressContainer>
      <S.InProgressTitle>진행 중인 미션</S.InProgressTitle>
      <MyMissionInProgressBanner />
    </S.MyMissionInProgressContainer>
  );
}
