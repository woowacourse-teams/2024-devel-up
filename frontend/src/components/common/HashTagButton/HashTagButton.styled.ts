import styled from 'styled-components';

interface ButtonProps {
  $isSelected: boolean;
}

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) => (props.$isSelected ? 'var(--primary-100)' : 'var(--primary-50)')};
  color: var(--black-color);
  transition: 0.2s;

  padding: 1rem 1.6rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.2rem;
  font-family: inherit;
  font-weight: 500;

  &:hover {
    background-color: ${(props) =>
      props.$isSelected ? 'var(--primary-200)' : 'var(--primary-100)'};
  }
`;
