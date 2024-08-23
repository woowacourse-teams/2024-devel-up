import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 3rem;
`;

export const Button = styled.button`
  border-radius: 0.5rem;
  background: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  width: 100%;
  height: 5rem;
  ${(props) => props.theme.font.button}
  margin-top: 4rem;

  &:hover {
    background: ${(props) => props.theme.colors.grey900};
  }
`;
