import { Link } from 'react-router-dom';
import * as S from './Header.styled';
import { ROUTES } from '@/constants/routes';

export default function Header() {
  return (
    <>
      <S.Container>
        <Link to={ROUTES.main}>
          <S.Logo>🚀 Devel Up</S.Logo>
        </Link>
      </S.Container>
      <S.Spacer />
    </>
  );
}
