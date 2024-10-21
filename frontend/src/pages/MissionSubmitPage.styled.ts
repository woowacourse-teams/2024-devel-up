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
  width: 100rem;
  margin: 0 auto;

  animation: ${show} 0.5s;
  transition: 0.5s;
`;
