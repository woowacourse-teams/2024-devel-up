import * as S from '@/components/Header/Header.styled';
import LogoImg from '@/assets/images/logo.svg';

export default function ErrorLogo() {
  return (
    <>
      <S.Container>
        <S.Wrapper>
          <S.LeftPart>
            <S.Logo>
              <LogoImg width={30} height={30} /> DEVEL UP
            </S.Logo>
          </S.LeftPart>
        </S.Wrapper>
      </S.Container>
      <S.Spacer />
    </>
  );
}
