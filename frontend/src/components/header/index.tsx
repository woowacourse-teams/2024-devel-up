import { Link } from 'react-router-dom';
import * as S from './Header.styled';
import { ROUTES } from '@/constants/routes';
import NotiModal from './NotiModal';
import { useState } from 'react';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBellClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  const closeModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
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
        {isModalOpen && <NotiModal closeModal={closeModal} />}
      </S.Container>
      <S.Spacer />
    </>
  );
}
