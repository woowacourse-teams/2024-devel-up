import { Link, useLocation } from 'react-router-dom';
import * as S from './Header.styled';
import { ROUTES } from '@/constants/routes';
import NotiModal from './NotiModal';
import { useState } from 'react';
import { BASE_URL } from '@/apis/baseUrl';
import { PATH } from '@/apis/paths';
import useUserInfo from '@/hooks/useUserInfo';

export default function Header() {
  const { pathname } = useLocation();
  const { data: userInfo } = useUserInfo();

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
        <S.LeftPart>
          <Link to={ROUTES.main}>
            <S.Logo>🚀 Devel Up</S.Logo>
          </Link>
        </S.LeftPart>
        <S.RightPart>
          <S.BellIcon onClick={handleBellClick} />
          {!userInfo && (
            <a href={`${BASE_URL.dev}${PATH.githubLogin}?next=${pathname}`}>
              <S.LoginButton>로그인</S.LoginButton>
            </a>
          )}
        </S.RightPart>
      </S.Container>
      {isModalOpen && <NotiModal closeModal={closeModal} />}
      <S.Spacer />
    </>
  );
}
