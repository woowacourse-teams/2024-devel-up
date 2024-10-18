import React from 'react';
import * as S from './AboutPage.styled';

interface LevelMissionProps {
  ref?: React.Ref<HTMLOptionElement>;
  isVisible: boolean;
}

const LevelMission = React.forwardRef<HTMLOptionElement, LevelMissionProps>(
  ({ isVisible }, ref) => {
    return (
      <S.ComponentContainer isVisible={isVisible} ref={ref}>
        <S.Wrapper>
          <S.Bold>🎯 레벨 별 실전 문제 제공</S.Bold>
          <S.ImgLeftPadding>
            <S.LevelMissionImg />
          </S.ImgLeftPadding>
          <S.TextAlignCenterWrapper>
            <S.MediumText>
              <S.MediumBold>미션</S.MediumBold>을 직접 풀며
              <br />
              <S.MediumBold>프로그래밍 실력</S.MediumBold>을 진단할 수 있어요.
            </S.MediumText>
          </S.TextAlignCenterWrapper>
        </S.Wrapper>
      </S.ComponentContainer>
    );
  },
);

LevelMission.displayName = 'LevelMission';

export default LevelMission;
