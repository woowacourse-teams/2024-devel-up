import media from '@/styles/mediaQueries';
import styled from 'styled-components';

interface ScrollButtonProps {
  $isVisible: boolean;
}

export const ScrollButton = styled.button<ScrollButtonProps>`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: rgba(115, 131, 214, 0.3);
  color: white;
  border: none;
  padding: 1.5rem;

  position: fixed;
  bottom: 4.5rem;
  right: 10rem;
  cursor: pointer;
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};

  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  z-index: 1000;
  transition:
    opacity 0.2s ease-in,
    background-color 0.2s ease;

  &:hover {
    background-color: rgba(115, 131, 214, 0.5);
  }

  ${media.small`
      width: 3rem;
      height: 3rem;
      padding: 1rem;

      right: 3rem;
    `}
`;
