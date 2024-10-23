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
  display: flex;
  max-width: 100rem;

  justify-content: space-between;
  row-gap: 3.6rem;
  flex-wrap: wrap;

  animation: ${show} 0.5s;
  transition: 0.5s;

  ${media.medium`
    justify-content: center;
    column-gap: 3rem;
    `}
`;
