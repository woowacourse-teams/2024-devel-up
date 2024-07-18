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
  padding: 0 20rem;
`;

export const LogoImg = styled.img`
  width: 13rem;
`;

export const Logo = styled.h1`
  font-size: 3rem;
  font-weight: 800;
`;

export const Spacer = styled.div`
  height: 8rem;
`;

export const BellIcon = styled(Bell)`
  width: 2.8rem;
  cursor: pointer;
`;

export const RightSection = styled.div`
  position: relative;
`;

export const LeftSection = styled.div``;

// NotiModal

export const NotiModalContainer = styled.div`
  z-index: 101;
  position: absolute;
  top: 5.5rem;
  right: 17rem;
  width: 30rem;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.1);

  border-radius: 1rem;
  padding: 2rem;
  background-color: var(--grey-100);
`;
