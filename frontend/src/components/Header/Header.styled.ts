import Bell from '@/assets/images/bell.svg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.nav`
  z-index: 100;
  width: 100%;
  min-width: 100rem;
  height: 6rem;
  position: fixed;
  background: ${(props) => props.theme.colors.white};
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  white-space: nowrap;
`;

export const Wrapper = styled.div`
  width: 100rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LogoImg = styled.img`
  width: 13rem;
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
  align-items: center;
  gap: 2.3rem;
`;

export const LeftPart = styled.div``;

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
  gap: 4.2rem;
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
