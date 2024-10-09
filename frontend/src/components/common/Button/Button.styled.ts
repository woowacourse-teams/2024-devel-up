import styled, { css } from 'styled-components';
import type { ButtonSize, ButtonVariant } from './Button';
import type { DefaultTheme } from 'styled-components/dist/types';

interface CommonButtonProps {
  $size: ButtonSize;
  $variant: ButtonVariant;
}

const getSizeStyles = (size: ButtonSize) => {
  const sizeMap = {
    default: 'fit-content',
    half: '27.1rem',
    full: '100%',
  };

  return sizeMap[size];
};

const getColorStyles = (variant: ButtonVariant, theme: DefaultTheme) => {
  const variantStyleMap: Record<
    ButtonVariant,
    {
      backgroundColor: string;
      color: string;
      hoverBackgroundColor: string;
      hoverColor?: string;
    }
  > = {
    default: {
      backgroundColor: theme.colors.grey200,
      color: theme.colors.black,
      hoverBackgroundColor: theme.colors.grey300,
    },
    primary: {
      backgroundColor: theme.colors.primary500,
      color: theme.colors.white,
      hoverBackgroundColor: theme.colors.primary600,
    },
    primaryText: {
      backgroundColor: 'transparent',
      color: theme.colors.primary500,
      hoverBackgroundColor: 'transparent',
      hoverColor: theme.colors.primary600,
    },
    defaultText: {
      backgroundColor: 'transparent',
      color: theme.colors.grey500,
      hoverBackgroundColor: 'transparent',
      hoverColor: theme.colors.grey800,
    },
  };

  const { backgroundColor, color, hoverBackgroundColor, hoverColor } = variantStyleMap[variant];

  return css`
    background-color: ${backgroundColor};
    color: ${color};

    &:hover {
      background-color: ${hoverBackgroundColor};
      color: ${hoverColor || color};
    }
  `;
};

export const CommonButton = styled.button<CommonButtonProps>`
  ${(props) => getColorStyles(props.$variant, props.theme)}
  width: ${(props) => getSizeStyles(props.$size)};
  min-height: 4.2rem;
  padding: 1rem 1.4rem;
  border-radius: 0.8rem;

  display: flex;
  gap: 0.3rem;
  justify-content: center;
  align-items: center;
  transition: 0.2s;

  white-space: nowrap;
  ${(props) => props.theme.font.button}

  &:disabled {
    cursor: default;
  }
`;
