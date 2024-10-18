import React from 'react';
import * as S from './AboutPage.styled';

interface SolutionProps {
  ref?: React.Ref<HTMLOptionElement>;
  isVisible: boolean;
}

const Solution = React.forwardRef<HTMLOptionElement, SolutionProps>(({ isVisible }, ref) => {
  return (
    <S.ComponentContainer isVisible={isVisible} ref={ref}>
      <S.Wrapper>
        <S.Bold>🧑🏻‍💻 다른 개발자들의 풀이 코드 제공</S.Bold>
        <S.ImgLeftPadding>
          <S.SolutionImg />
        </S.ImgLeftPadding>

        <S.TextAlignCenterWrapper>
          <S.MediumText>
            다른 개발자들의
            <S.MediumBold> 풀이 코드</S.MediumBold>
            를 둘러보며
            <br />더 나은 코드 작성법을
            <S.MediumBold> 학습</S.MediumBold>
            하고
            <S.MediumBold> 조언</S.MediumBold>을 구할 수 있어요.
          </S.MediumText>
        </S.TextAlignCenterWrapper>
      </S.Wrapper>
    </S.ComponentContainer>
  );
});

Solution.displayName = 'Solution';

export default Solution;
