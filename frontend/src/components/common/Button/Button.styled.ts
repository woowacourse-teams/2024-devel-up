import styled from 'styled-components';

interface CommonButtonProps {
  $bgColor: string;
  $fontColor: string;
  $hoverColor: string;
}

export const CommonButton = styled.button<CommonButtonProps>`
  background-color: var(${(props) => props.$bgColor});
  color: var(${(props) => props.$fontColor});

  width: fit-content;
  padding: 1.2rem 1.8rem;
  border-radius: 0.8rem;

  display: flex;
  gap: 0.3rem;
  justify-content: center;
  align-items: center;

  white-space: nowrap;
  font-size: 1.4rem;
  font-weight: 500;

  &:hover {
    background-color: var(${(props) => props.$hoverColor});
  }

  &:disabled {
    cursor: default;
  }
`;
