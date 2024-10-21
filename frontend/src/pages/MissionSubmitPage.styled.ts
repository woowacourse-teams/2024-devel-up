import styled, { keyframes } from 'styled-components';

const show = keyframes`
  0% {
    opacity: 0;
    }

  100% {
    opacity: 1;
  }
`;

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 1.5rem;
  min-width: 450px;

  animation: ${show} 0.5s;
  transition: 0.5s;
`;
