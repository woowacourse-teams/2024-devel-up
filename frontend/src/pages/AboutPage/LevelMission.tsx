import React from 'react';
import * as S from './AboutPage.styled';

interface LevelMissionProps {
  ref?: React.Ref<HTMLOptionElement>;
}

const LevelMission = React.forwardRef<HTMLOptionElement, LevelMissionProps>((_, ref) => {
  return (
    <S.LevelMissionContainer ref={ref}>
      <S.Bold>🎯 레벨 별 실전 문제 제공</S.Bold>
      <S.ContentWrapper>
        <S.LevelMissionImg />

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
});

LevelMission.displayName = 'LevelMission';

export default LevelMission;
