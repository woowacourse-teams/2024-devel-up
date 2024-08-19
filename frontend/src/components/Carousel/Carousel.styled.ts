import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
  width: 100rem;
  margin: 0 auto;
  height: 42.5rem;
`;

export const SlideWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

interface SlideTrackProps {
  $currentIndex: number;
  $isSliding: boolean;
}

export const SlideTrack = styled.ul<SlideTrackProps>`
  display: flex;
  flex-direction: row;
  position: relative;
  transform-style: preserve-3d;
  transition: ${({ $isSliding }) => ($isSliding ? 'transform 400ms ease-in-out' : 'none')};
  transform: ${({ $currentIndex }) => `translateX(-${$currentIndex * 100}%)`};
  padding: 0;
  margin: 0;
  list-style: none;
  height: 100%;
`;

export const Slide = styled.li`
  flex: 1 0 100%;
  position: relative;
  width: 100%;
  transform-style: preserve-3d;
`;

export const Button = styled.button`
  margin: 5px;
  padding: 10px;
  border: none;
  width: 4.7rem;
  height: 10rem;
  background: rgba(0, 0, 0, 0.1);
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
  position: absolute;
  border-radius: 0.8rem;
  bottom: 43%;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

export const PreviousButton = styled(Button)`
  left: 3rem;
`;

export const NextButton = styled(Button)`
  right: 3rem;
`;
