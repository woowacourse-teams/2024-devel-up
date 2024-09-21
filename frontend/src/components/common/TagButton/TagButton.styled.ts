import styled, { css } from 'styled-components';
import type { TagButtonVariant } from '.';
import type { DefaultTheme } from 'styled-components/dist/types';

interface ButtonProps {
  $isSelected: boolean;
  $variant: TagButtonVariant;
}

const getColorStyles = (variant: TagButtonVariant, isSelected: boolean, theme: DefaultTheme) => {
  const variantColorMap = {
    default: {
      default: isSelected ? theme.colors.primary100 : theme.colors.primary50,
      hover: isSelected ? theme.colors.primary200 : theme.colors.primary100,
    },
    danger: {
      default: isSelected ? theme.colors.danger100 : theme.colors.danger50,
      hover: isSelected ? theme.colors.danger200 : theme.colors.danger100,
    },
  };

  const { default: defaultColor, hover: hoverColor } = variantColorMap[variant];

  return css`
    background-color: ${defaultColor};
    &:hover {
      background-color: ${hoverColor};
    }
  `;
};

export const Button = styled.button<ButtonProps>`
  ${(props) => getColorStyles(props.$variant, props.$isSelected, props.theme)}
  color: var(--black-color);
  transition: 0.2s;

  padding: 1rem 1.6rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => props.theme.font.badge}
`;
