import { Link, useLocation } from 'react-router-dom';
import * as S from './Header.styled';
import { ROUTES } from '@/constants/routes';
import NotiModal from './NotiModal';
import { BASE_URL } from '@/apis/baseUrl';
import { PATH } from '@/apis/paths';
import useUserInfo from '@/hooks/useUserInfo';
import HeaderMenu from './HeaderMenu';
import useLogoutMutation from '@/hooks/useLogoutMutation';
import useModal from '@/hooks/useModal';

export default function Header() {
  const { pathname } = useLocation();
  const { data: userInfo } = useUserInfo();
  const { handleUserLogout } = useLogoutMutation();
  const { isModalOpen, handleModalClose, handleToggleModal } = useModal();

  return (
    <>
      <S.Container>
        <S.LeftPart>
          <Link to={ROUTES.main}>
            <S.Logo>🚀 Devel Up</S.Logo>
          </Link>
        </S.LeftPart>
        <S.MenuWrapper>
          <HeaderMenu name="미션" path={ROUTES.missionList} currentPath={pathname} />
          <HeaderMenu name="솔루션" path={ROUTES.solutions} currentPath={pathname} />
        </S.MenuWrapper>
        <S.RightPart>
          <HeaderMenu name="대시보드" path={ROUTES.dashboardHome} currentPath={pathname} />
          {userInfo && <S.BellIcon onClick={handleToggleModal} />}
          {!userInfo ? (
            <a href={`${BASE_URL.dev}${PATH.githubLogin}?next=${pathname}`}>
              <S.LoginButton>로그인</S.LoginButton>
            </a>
          ) : (
            <S.LoginButton onClick={handleUserLogout}>로그아웃</S.LoginButton>
          )}
        </S.RightPart>
      </S.Container>
      {isModalOpen && <NotiModal closeModal={handleModalClose} />}
      <S.Spacer />
    </>
  );
}
