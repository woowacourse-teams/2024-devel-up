import styled, { keyframes } from 'styled-components';

const show = keyframes`
  0% {
    opacity: 0;
    }

  100% {
    opacity: 1;
  }
`;

export const SolutionList = styled.div`
  display: flex;
  max-width: 100rem;

  column-gap: 5rem;
  row-gap: 3.6rem;
  flex-wrap: wrap;

  animation: ${show} 0.5s;
  transition: 0.5s;
`;
