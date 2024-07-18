import { keyframes, styled } from 'styled-components';

export const TabPageContainer = styled.div`
  width: 70rem;
  height: 100%;
  margin: 0 auto;
  padding-top: 3rem;
`;

export const TabListContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const CurrentTabContentContainer = styled.div`
  word-break: break-all;
  margin-top: 2rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const TabContainer = styled.div<{ isSelected: boolean }>`
  padding: 10px 20px;
  cursor: pointer;
  background: ${({ isSelected }) => (isSelected ? 'var(--primary-700)' : 'var(--grey-700)')};
  font-size: 1.5rem;
  color: white;
  border-radius: 1rem 1rem 0 0;
  margin: 0 5px;
  transition:
    background 0.3s,
    box-shadow 0.3s;

  ${({ isSelected }) =>
    isSelected &&
    `
    box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
    animation: tabSelected 0.3s ease-out;
  `}

  &:hover {
    background: ${({ isSelected }) => (isSelected ? 'var(--primary-500)' : 'var(--grey-500)')};
  }

  @keyframes tabSelected {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;
