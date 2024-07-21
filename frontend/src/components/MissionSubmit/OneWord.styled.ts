import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
  margin: 1.1rem 0;
`;

export const TextArea = styled.textarea`
  border-radius: 0.5rem;
  background: var(--grey-100);
  padding: 1rem;
  height: 14rem;
`;
