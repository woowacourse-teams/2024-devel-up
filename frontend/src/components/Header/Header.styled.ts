import Bell from '@/assets/images/bell.svg';
import media from '@/styles/mediaQueries';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HamburgerToggle from '@/assets/images/hamburgerToggle.svg';
import LogoImg from '@/assets/images/logo.svg';

export const Container = styled.nav`
  z-index: 100;
  width: 100%;
  height: 6rem;
  position: fixed;
  background: ${(props) => props.theme.colors.white};
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  white-space: nowrap;

  ${media.medium`
      display: none;
    `}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  max-width: 100rem;
  width: 100%;
  padding: 0 1rem;
`;

export const LogoImage = styled(LogoImg)`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`;

export const Logo = styled.h1`
  ${(props) => props.theme.font.heading3};
  margin-left: 1rem;
`;

export const Spacer = styled.div`
  height: 6rem;
`;

export const BellIcon = styled(Bell)`
  width: 2.8rem;
  cursor: pointer;
`;

export const RightPart = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  gap: 2.3rem;
`;

export const LeftPart = styled.div`
  display: flex;
  flex: 1;
`;

export const LogoWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginButton = styled.button`
  ${(props) => props.theme.font.body}
  padding: 0.5rem;
  border-radius: 1rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.grey50};
  }
`;

export const MenuWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 4.2rem;
  justify-content: center;
`;

export const MenuTextLink = styled(Link)`
  ${media.medium`
      width: 100%;
      text-align: center;
      `}
`;
export const MenuText = styled.p<{ $isActive?: boolean }>`
  ${(props) => props.theme.font.body}
  color: ${({ $isActive, theme }) => ($isActive ? '' : theme.colors.grey400)};
  padding: 0.5rem;
  border-radius: 1rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.grey50};
  }
`;

//  Mobile

export const MobileContainer = styled.nav`
  display: none;

  z-index: 100;
  width: 100%;
  position: fixed;
  background: ${(props) => props.theme.colors.white};
  top: 0;
  left: 0;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  white-space: nowrap;
  padding: 0 2rem;

  ${media.medium`
      display: block;
    `}
`;

export const HamburgerToggleIcon = styled(HamburgerToggle)`
  width: 2.5rem;
  color: ${(props) => props.theme.colors.grey400};
  cursor: pointer;
`;

export const MobileWrapper = styled.div`
  display: flex;
  height: 6rem;
  width: 100%;
`;

export const MobileLeft = styled.div`
  display: flex;
  flex: 1;
`;

export const MobileCenter = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ToggleMenu = styled.menu`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  width: 100%;
`;

export const DashboardWrapper = styled.div`
  width: fit-content;
`;
