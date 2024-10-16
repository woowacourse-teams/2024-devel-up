import * as S from './AboutPage.styled';

export default function Rocket() {
  return (
    <S.RocketContainer>
      <S.RocketImg />
      <div>
        <S.TextAlignCenterWrapper>
          <S.PrimaryBold>Devel Up</S.PrimaryBold>
          <S.Bold>이 여러분의</S.Bold>
        </S.TextAlignCenterWrapper>
        <div>
          <S.PrimaryBold>Level Up</S.PrimaryBold>
          <S.Bold>을 도와드릴게요!</S.Bold>
        </div>
      </div>
    </S.RocketContainer>
  );
}
