import styled from 'styled-components';

interface ButtonProps {
  $isSelected: boolean;
}

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.$isSelected ? props.theme.colors.primary100 : props.theme.colors.primary50};
  color: var(--black-color);
  transition: 0.2s;

  padding: 1rem 1.6rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => props.theme.font.badge}

  &:hover {
    background-color: ${(props) =>
      props.$isSelected ? props.theme.colors.primary200 : props.theme.colors.primary100};
  }
`;
