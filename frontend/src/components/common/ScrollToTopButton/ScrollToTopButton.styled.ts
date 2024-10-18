import media from '@/styles/mediaQueries';
import styled from 'styled-components';
// import UpArrow from '@/assets/images/upArrow.svg';

export const ScrollButton = styled.button`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  background-color: rgba(115, 131, 214, 0.3);
  color: white;
  border: none;
  padding: 2rem;

  position: fixed;
  bottom: 4.5rem;
  right: 10rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(115, 131, 214, 0.5);
  }

  ${media.small`
      width: 3rem;
      height: 3rem;
      padding: 1rem;

      right: 5rem;
    `}
`;

// export const UpArrowImg = styled(UpArrow)`
//   w
// `
