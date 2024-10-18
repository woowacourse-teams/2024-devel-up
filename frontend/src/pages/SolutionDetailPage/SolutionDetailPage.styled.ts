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
  width: 100rem;
  margin: 0 auto;
  padding-bottom: 10rem;

  animation: ${show} 0.5s;
  transition: 0.5s;
`;
