import styled, { keyframes } from 'styled-components';

const show = keyframes`
  0% {
    opacity: 0;
    }

  100% {
    opacity: 1;
  }
`;

export const MissionDetailPageContainer = styled.div`
  width: 100rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;

  animation: ${show} 0.5s;
  transition: 0.5s;
`;
