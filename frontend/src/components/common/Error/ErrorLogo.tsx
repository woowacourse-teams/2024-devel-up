import * as S from '@/components/Header/Header.styled';
import { ROUTES } from '@/constants/routes';

export default function ErrorLogo() {
  return (
    <>
      <S.Container>
        <S.Wrapper>
          <S.LeftPart>
            <S.Logo>🚀 DEVEL UP</S.Logo>
          </S.LeftPart>
        </S.Wrapper>
      </S.Container>
      <S.Spacer />
    </>
  );
}