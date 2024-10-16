import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const SkipTag = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  width: 10rem;
  height: 8rem;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    z-index: 1000;
    background: ${(props) => props.theme.colors.primary500};
    color: ${(props) => props.theme.colors.white};
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }
`;
