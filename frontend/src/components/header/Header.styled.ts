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
  align-items: center;
  padding-left: 20rem;
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
