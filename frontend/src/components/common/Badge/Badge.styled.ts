import styled from 'styled-components';

interface BadgeContainerProps {
  $backgroundColor: string;
  $fontColor: string;
}

export const BadgeContainer = styled.div<BadgeContainerProps>`
  color: ${({ $fontColor }) => $fontColor};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  width: fit-content;
  padding: 0.5rem;
  border-radius: 0.4rem;
`;
