import React from 'react';
import * as S from './AboutPage.styled';

interface SolutionProps {
  ref?: React.Ref<HTMLOptionElement>;
  isVisible: boolean;
}

const Solution = React.forwardRef<HTMLOptionElement, SolutionProps>(({ isVisible }, ref) => {
  return (
    <S.SolutionContainer isVisible={isVisible} ref={ref}>
      <S.Wrapper>
        <S.Bold>🧑🏻‍💻 다른 개발자들의 풀이 코드 제공</S.Bold>
        <S.ImgLeftPadding>
          <S.SolutionImg />
        </S.ImgLeftPadding>

        <S.TextAlignCenterWrapper>
          <S.MediumText>다른 개발자들의 </S.MediumText>
          <S.MediumBold>풀이 코드</S.MediumBold>
          <S.MediumText>
            를 둘러보며
            <br />
          </S.MediumText>
          <S.MediumText>더 나은 코드 작성법을 </S.MediumText>
          <S.MediumBold>학습</S.MediumBold>
          <S.MediumText>하고 </S.MediumText>
          <S.MediumBold>조언</S.MediumBold>
          <S.MediumText>을 구할 수 있어요.</S.MediumText>
        </S.TextAlignCenterWrapper>
      </S.Wrapper>
    </S.SolutionContainer>
  );
});

Solution.displayName = 'Solution';

export default Solution;
