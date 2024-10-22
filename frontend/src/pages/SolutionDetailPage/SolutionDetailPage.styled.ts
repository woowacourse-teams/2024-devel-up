import styled, { keyframes } from 'styled-components';

const show = keyframes`
  0% {
    opacity: 0;
    }

  100% {
    opacity: 1;
  }
`;

export const SolutionDetailPageContainer = styled.div`
  margin: 0 auto;
  padding: 0 1.6rem 10rem;
  min-width: 40rem;
  padding-bottom: 10rem;

  animation: ${show} 0.5s;
  transition: 0.5s;
`;
