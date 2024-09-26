import type { PropsWithChildren } from 'react';
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

export default function DashboardPageLayout({ children }: PropsWithChildren) {
  const { data: userInfo } = useUserInfo();
  const location = useLocation();
  const currentPathText = PATH_INFO.find((path) => path.name === location.pathname);

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
