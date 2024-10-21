import type { UserInfo } from '@/types/user';
import * as S from './Header.styled';
import HeaderMenu from './HeaderMenu';
import { ROUTES } from '@/constants/routes';
import { API_URL } from '@/apis/clients/develupClient';
import { PATH } from '@/apis/paths';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

interface MobileProps {
  userInfo: UserInfo | undefined;
  handleUserLogout: () => void;
}

export default function Mobile({ userInfo, handleUserLogout }: MobileProps) {
  const { pathname } = useLocation();
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const handleToggle = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  return (
    <>
      <S.MobileContainer>
        <S.MobileWrapper>
          <S.MobileLeft>
            <S.HamburgerToggleIcon onClick={handleToggle} />
          </S.MobileLeft>
          <S.MobileCenter>
            <Link to={ROUTES.main}>
              <S.LogoImage />
            </Link>
          </S.MobileCenter>

          <S.RightPart>
            {userInfo && (
              <S.DashboardWrapper>
                <HeaderMenu
                  name="대시보드"
                  path={ROUTES.dashboardHome}
                  currentPath={pathname}
                  handleToggle={handleToggle}
                />
              </S.DashboardWrapper>
            )}
            {!userInfo ? (
              <a href={`${API_URL}${PATH.githubLogin}?next=${pathname}`}>
                <S.LoginButton aria-label="클릭하면 깃허브 로그인으로 이동합니다.">
                  로그인
                </S.LoginButton>
              </a>
            ) : (
              <S.LoginButton onClick={handleUserLogout}>로그아웃</S.LoginButton>
            )}
          </S.RightPart>
        </S.MobileWrapper>
        {isToggleOpen && (
          <S.ToggleMenu>
            <HeaderMenu
              name="미션"
              path={ROUTES.missionList}
              currentPath={pathname}
              handleToggle={handleToggle}
            />
            <HeaderMenu
              name="풀이"
              path={ROUTES.solutions}
              currentPath={pathname}
              handleToggle={handleToggle}
            />
            <HeaderMenu
              name="디스커션"
              path={ROUTES.discussions}
              currentPath={pathname}
              handleToggle={handleToggle}
            />
          </S.ToggleMenu>
        )}
      </S.MobileContainer>
    </>
  );
}
