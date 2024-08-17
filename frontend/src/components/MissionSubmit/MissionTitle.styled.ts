import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
  margin: 1.1rem 0;
`;

export const Input = styled.input`
  border-radius: 0.5rem;
  background: ${(props) => props.theme.colors.grey100};
  padding: 1rem;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;
