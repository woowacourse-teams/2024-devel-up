import * as S from './AboutPage.styled';

interface RocketProps {
  handleScrollDown: () => void;
}

export default function Rocket({ handleScrollDown }: RocketProps) {
  return (
    <S.RocketContainer>
      <S.RocketImg />
      <S.TextAlignCenterWrapper>
        <S.Bold>
          <S.PrimaryBold>Devel Up</S.PrimaryBold>이 여러분의
          <br />
          <S.PrimaryBold>Level Up</S.PrimaryBold>을 도와드릴게요!
        </S.Bold>
      </S.TextAlignCenterWrapper>
      <S.DownArrow
        onClick={handleScrollDown}
        id="main-down-arrow"
        aria-label="아래 버튼"
        tabIndex={0}
      />
    </S.RocketContainer>
  );
}
