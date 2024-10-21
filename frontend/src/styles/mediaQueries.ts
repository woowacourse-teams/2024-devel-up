https://github.com/woowacourse-teams/2024-devel-up/pull/708/conflict?name=frontend%252Fsrc%252Fpages%252FDashboardPage%252FDashBoardPageLayout%252FDashBoardPageLayout.styled.ts&ancestor_oid=eb208d08f3d30842411e036c48bbc47aa8569dd0&base_oid=1bdb26ca8bd9b7faf8dd3c04562b538488943063&head_oid=6b531fa3ff9e5a5deba24cd226b0752fe0c95a49import { css, type CSSObject, type Interpolation } from 'styled-components';

export type Breakpoints = 'small' | 'medium' | 'landingMedium' | 'large';

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
