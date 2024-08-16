import styled from 'styled-components';

interface BadgeContainerProps {
  $backgroundColor: string;
  $fontColor: string;
}

export const BadgeContainer = styled.div<BadgeContainerProps>`
  color: ${({ $fontColor }) => $fontColor};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  width: fit-content;
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;
  font-size: 1.2rem;
  white-space: nowrap;
`;
