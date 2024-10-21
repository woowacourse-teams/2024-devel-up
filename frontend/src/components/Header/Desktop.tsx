import { useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import * as S from './Header.styled';
import HeaderMenu from './HeaderMenu';
import type { UserInfo } from '@/types/user';
import { API_URL } from '@/apis/clients/develupClient';
import { PATH } from '@/apis/paths';

interface DesktopProps {
  userInfo: UserInfo | undefined;
  handleUserLogout: () => void;
}

export default function Desktop({ userInfo, handleUserLogout }: DesktopProps) {
  const { pathname } = useLocation();

  return (
    <>
      <S.Container>
        <S.Wrapper>
          <S.LeftPart>
            <S.LogoWrapper to={ROUTES.main}>
              <S.LogoImage />
              <S.Logo> DEVEL UP</S.Logo>
            </S.LogoWrapper>
          </S.LeftPart>
          <S.MenuWrapper>
            <HeaderMenu name="미션" path={ROUTES.missionList} currentPath={pathname} />
            <HeaderMenu name="풀이" path={ROUTES.solutions} currentPath={pathname} />
            <HeaderMenu name="디스커션" path={ROUTES.discussions} currentPath={pathname} />
          </S.MenuWrapper>
          <S.RightPart>
            {/* 아직 알림이 mock data라서 주석처리 해놓겠습니다 @프룬 */}
            {/* {userInfo && <S.BellIcon onClick={handleToggleModal} />} */}
            {userInfo && (
              <HeaderMenu name="대시보드" path={ROUTES.dashboardHome} currentPath={pathname} />
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
        </S.Wrapper>
      </S.Container>
      {/* {isModalOpen && <NotiModal closeModal={handleModalClose} />} */}
      <S.Spacer />
    </>
  );
}
