import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  margin: 8rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Image = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
`;

export const Header = styled.h1`
  ${(props) => props.theme.font.heading3}
`;

export const Body = styled.p`
  ${(props) => props.theme.font.body}
`;
