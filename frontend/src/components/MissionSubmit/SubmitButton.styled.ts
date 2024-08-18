import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  border-radius: 0.5rem;
  background: ${(props) => props.theme.colors.blackColor};
  color: ${(props) => props.theme.colors.whiteColor};
  width: 100%;
  height: 5rem;
  ${(props) => props.theme.font.button}
  margin-top: 10rem;
`;
