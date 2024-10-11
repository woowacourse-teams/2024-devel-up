import styled, { css } from 'styled-components';
import type { TagButtonVariant } from '.';
import type { DefaultTheme } from 'styled-components/dist/types';

interface ButtonProps {
  $isSelected: boolean;
  $variant: TagButtonVariant;
  $isClickable: boolean;
}

interface GetColorStylesParams {
  variant: TagButtonVariant;
  isSelected: boolean;
  isClickable: boolean;
  theme: DefaultTheme;
}

const getColorStyles = ({ variant, isSelected, isClickable, theme }: GetColorStylesParams) => {
  const variantColorMap = {
    default: {
      default: isSelected ? theme.colors.primary200 : theme.colors.primary50,
      hover: isSelected ? theme.colors.primary300 : theme.colors.primary100,
      color: theme.colors.black,
    },
    danger: {
      default: isSelected ? theme.colors.danger200 : theme.colors.danger50,
      hover: isSelected ? theme.colors.danger300 : theme.colors.danger100,
      color: theme.colors.black,
    },
  };

  const { default: defaultColor, hover: hoverColor, color } = variantColorMap[variant];

  return css`
    background-color: ${defaultColor};
    color: ${color};
    cursor: default;

    ${isClickable &&
    css`
      cursor: pointer;
      &:hover {
        background-color: ${hoverColor};
      }
    `}
  `;
};

export const Button = styled.button<ButtonProps>`
  ${(props) =>
    getColorStyles({
      variant: props.$variant,
      isSelected: props.$isSelected,
      isClickable: props.$isClickable,
      theme: props.theme,
    })};
  transition: 0.2s;

  padding: 1rem 1.6rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => props.theme.font.badge}
`;
