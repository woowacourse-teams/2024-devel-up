import type { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import useUserInfo from '@/hooks/useUserInfo';
import * as S from './DashBoardPageLayout.styled';
import { Link, useLocation } from 'react-router-dom';

const PATH_INFO = [
  {
    name: '/dashboard/in-progress-mission',
    text: '진행 중인 미션',
  },
  {
    name: '/dashboard/submitted-solution',
    text: '제출한 풀이',
  },
  {
    name: '/dashboard/comments',
    text: '작성한 풀이 댓글',
  },
  {
    name: '/dashboard/discussions',
    text: '제출한 디스커션',
  },
  {
    name: '/dashboard/discussion/comments',
    text: '작성한 디스커션 댓글',
  },
];

interface DashboardLayoutContextValue {
  path: string;
  setPath: (path: string) => void;
}

const DashboardLayoutContext = createContext<DashboardLayoutContextValue | null>(null);

export const useDashboardLayoutContext = () => {
  const context = useContext(DashboardLayoutContext);

  if (!context) {
    throw new Error('');
  }

  return context;
};

export const DashboardLayoutContextProvider = ({ children }: PropsWithChildren) => {
  const [path, setPath] = useState('');
  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  return (
    <DashboardLayoutContext.Provider value={{ path, setPath }}>
      {children}
    </DashboardLayoutContext.Provider>
  );
};

export default function DashboardPageLayout({ children }: PropsWithChildren) {
  const { path } = useDashboardLayoutContext();
  const { data: userInfo } = useUserInfo();
  const currentPathText = PATH_INFO.find((item) => item.name === path);

  return (
    <S.Container>
      <S.ProfileAndCurrentPathWrapper>
        <S.ProfileWrapper>
          <S.ProfileImageWrapper>
            <S.ProfileImage src={userInfo?.imageUrl} alt="프로필 이미지" />
          </S.ProfileImageWrapper>

          <S.ProfileName>{userInfo?.name}</S.ProfileName>
        </S.ProfileWrapper>
        <S.PathWrapper>
          {PATH_INFO.map((path, index) => {
            return (
              <S.LinkWrapper key={index}>
                <S.Circle $isSelected={path.name === location.pathname} />
                <Link to={path.name}>
                  <S.Path $isSelected={path.name === location.pathname}>{path.text}</S.Path>
                </Link>
              </S.LinkWrapper>
            );
          })}
        </S.PathWrapper>
      </S.ProfileAndCurrentPathWrapper>
      <S.ContentWrapper>
        <S.CurrentPathText>{currentPathText?.text}</S.CurrentPathText>
        {children}
      </S.ContentWrapper>
    </S.Container>
  );
}
