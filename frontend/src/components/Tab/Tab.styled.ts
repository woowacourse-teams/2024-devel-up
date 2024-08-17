import { keyframes, styled } from 'styled-components';

export const TabPageContainer = styled.div`
  width: 100rem;
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

export const CurrentContentContainer = styled.div`
  word-break: break-all;
  animation: ${fadeIn} 0.3s ease-out;
  background: ${(props) => props.theme.colors.grey50};
  font-size: 2rem;
`;

export const TabContainer = styled.div<{ $isSelected: boolean }>`
  padding: 1rem 2rem;
  cursor: pointer;
  background: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary200 : theme.colors.grey50};
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.blackColor};
  border-radius: 3rem 3rem 0 0;
  flex: 1;
  transition:
    background 0.3s,
    box-shadow 0.3s;

  ${({ $isSelected }) =>
    $isSelected &&
    `
    box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
    animation: tabSelected 0.3s ease-out;
  `}

  &:hover {
    background: ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.primary300 : theme.colors.grey100};
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
