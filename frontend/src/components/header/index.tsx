import { Link } from 'react-router-dom';
import * as S from './Header.styled';
import { ROUTES } from '@/constants/routes';
import { useState } from 'react';

export default function Header() {
  const [, setIsNotiModalOpen] = useState(false);

  const handleBellClick = () => {
    setIsNotiModalOpen((prev) => !prev);
  };

  return (
    <>
      <S.Container>
        <S.LeftSection>
          <Link to={ROUTES.main}>
            <S.Logo>🚀 Devel Up</S.Logo>
          </Link>
        </S.LeftSection>
        <S.RightSection>
          <S.BellIcon onClick={handleBellClick} />
        </S.RightSection>
      </S.Container>
      <S.Spacer />
    </>
  );
}
