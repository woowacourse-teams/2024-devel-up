import { css, type CSSObject, type Interpolation } from 'styled-components';

export type Breakpoints = 'small' | 'medium' |'landingMedium' | 'large';

export const breakpoints: Record<Breakpoints, string> = {
  small: '@media (max-width: 480px)',
  medium: '@media (max-width: 768px)',
  landingMedium: '@media (max-width: 890px)',
  large: '@media (min-width: 481px)',
};

const media = Object.entries(breakpoints).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: (
      first: CSSObject | TemplateStringsArray,
      ...interpolations: Interpolation<object>[]
    ) => css`
      ${value} {
        ${css(first, ...interpolations)}
      }
    `,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}, {}) as Record<Breakpoints, any>;

export default media;
