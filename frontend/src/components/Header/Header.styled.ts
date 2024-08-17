import Bell from '@/assets/images/bell.svg';
import styled from 'styled-components';

export const Container = styled.nav`
  z-index: 100;
  width: 100%;
  height: 6rem;
  position: fixed;
  background: white;
  top: 0;
  left: 0;
  box-shadow:
    2px 4px rgba(0, 0, 0, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.08);

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 26rem;
`;

export const LogoImg = styled.img`
  width: 13rem;
`;

export const Logo = styled.h1`
  font-size: 3rem;
  font-weight: 800;
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
  align-items: center;
  gap: 2.3rem;
`;

export const LeftPart = styled.div``;

export const LoginButton = styled.button`
  font-size: 1.3rem;
`;

export const MenuWrapper = styled.div`
  display: flex;
  gap: 8rem;
`;

export const MenuText = styled.p<{ $isActive?: boolean }>`
  font-size: 1.6rem;
  color: ${({ $isActive, theme }) => ($isActive ? '' : theme.colors.grey400)};
`;
