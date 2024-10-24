import media from '@/styles/mediaQueries';
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 30rem));
  justify-content: start;
  justify-items: center;
  row-gap: 3.6rem;
  column-gap: 2rem;

  animation: ${show} 0.5s;
  transition: 0.5s;

  ${media.medium`
    justify-content: center;
    column-gap: 3rem;
    `}
`;

export const SolutionItemWrapper = styled.div`
  max-width: 30rem;
`;
