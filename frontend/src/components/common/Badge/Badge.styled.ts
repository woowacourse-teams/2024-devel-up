import styled, { css } from 'styled-components';
import type { BadgeVariant } from '.';
import type { DefaultTheme } from 'styled-components/dist/types';
import media from '@/styles/mediaQueries';

interface BadgeContainerProps {
  $variant: BadgeVariant;
}

const getColorStyles = (variant: BadgeVariant, theme: DefaultTheme) => {
  const variantColorMap = {
    default: {
      backgroundColor: theme.colors.primary50,
      color: theme.colors.black,
    },
    danger: {
      backgroundColor: theme.colors.danger50,
      color: theme.colors.black,
    },
  };
  const { backgroundColor, color } = variantColorMap[variant];

  return css`
    background-color: ${backgroundColor};
    color: ${color};
  `;
};

export const BadgeContainer = styled.div<BadgeContainerProps>`
  ${(props) => props.theme.font.badge}
  ${(props) => getColorStyles(props.$variant, props.theme)}

  width: fit-content;
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;
  white-space: nowrap;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  overflow: hidden;

  ${media.small`
      max-width: 10rem;
    `}
`;
