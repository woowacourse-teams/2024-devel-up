import * as S from './AboutPage.styled';

export default function DiscussionSpace() {
  return (
    <S.DiscussionContainer>
      <S.Bold>📝 소통 공간 제공</S.Bold>
      <S.DiscussionImgWrapper>
        <S.DiscussionImg />
      </S.DiscussionImgWrapper>

      <S.TextAlignCenterWrapper>
        <S.MediumText>선배/동료 개발자와 </S.MediumText>
        <S.MediumBold>피드백</S.MediumBold>
        <S.MediumText>과 </S.MediumText>
        <S.MediumBold>질문</S.MediumBold>
        <S.MediumText>
          을 주고 받으며
          <br />
        </S.MediumText>
        <S.MediumBold>학습 방향</S.MediumBold>
        <S.MediumText>을 올바르게 조정해 나갈 수 있어요.</S.MediumText>
      </S.TextAlignCenterWrapper>
    </S.DiscussionContainer>
  );
}
