import styled, { keyframes } from 'styled-components';

const show = keyframes`
  0% {
    opacity: 0;
    }

  100% {
    opacity: 1;
  }
`;

export const DiscussionSubmitPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
  margin: 4.5rem auto 0;
  width: 100%;
  max-width: 100rem;
  padding: 0 1.6rem;

  animation: ${show} 0.5s;
  transition: 0.5s;
`;
