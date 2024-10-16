import * as S from './AboutPage.styled';

export default function LevelMission() {
  return (
    <S.LevelMissionContainer>
      <S.Bold>🎯 레벨 별 실전 문제 제공</S.Bold>
      <S.ContentWrapper>
        <S.MissionCardWrapper>
          <S.MissionCardElevatorImg />
          <S.MissionCardReactImg />
        </S.MissionCardWrapper>
        <S.VSCodeImg />

        <S.LevelMissionTextWrapper>
          <S.MediumBold>미션</S.MediumBold>
          <S.MediumText>
            을 직접 풀며
            <br />
          </S.MediumText>
          <S.MediumBold>프로그래밍 실력</S.MediumBold>
          <S.MediumText>을 진단할 수 있어요.</S.MediumText>
        </S.LevelMissionTextWrapper>
      </S.ContentWrapper>
    </S.LevelMissionContainer>
  );
}
