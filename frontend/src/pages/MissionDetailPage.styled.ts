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
  padding: 0 1.6rem;

  min-width: 40rem;
`;

export const MissionDetailInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  max-width: 100rem;

  animation: ${show} 0.5s;
  transition: 0.5s;
`;
