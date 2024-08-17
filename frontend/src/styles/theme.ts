import type { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary50: '#E7E9F8',
    primary100: '#C4C9ED',
    primary200: '#9CA6E1',
    primary300: '#7383D6',
    primary400: '#5367CD',
    primary500: '#304CC4',
    primary600: '#2A44B9',
    primary700: '#1F3AAD',
    primary800: '#1430A1',
    primary900: '#001C8E',
    danger50: '#FFE9EC',
    danger100: '#FFC8CC',
    danger200: '#F8918E',
    danger300: '#F06461',
    danger400: '#F93A37',
    danger500: '#FC1D10',
    danger600: '#EE0014',
    danger700: '#DC000F',
    danger800: '#D00004',
    danger900: '#C20000',
    grey50: '#F7F7F7',
    grey100: '#ECECEC',
    grey200: '#E0E0E0',
    grey300: '#CCCCCC',
    grey400: '#A7A7A7',
    grey500: '#868686',
    grey600: '#5F5F5F',
    grey700: '#4C4C4C',
    grey800: '#2F2F2F',
    grey900: '#0E0E0E',

    whiteColor: '#FFFFFF',
    blackColor: '#000000',
  },
  font: {
    heading1: `
      font-size: 2.8rem;
      font-weight: bold;
      font-family: inherit;
    `,
    heading2: `
      font-size: 2.6rem;
      font-weight: bold;
      font-family: inherit;
    `,
    heading3: `
      font-size: 2.4rem;
      font-weight: bold;
      font-family: inherit;
    `,
    subHeading: `
      font-size: 2.2rem;
      font-weight: 500;
      font-family: inherit;
    `,
    body: `
      font-size: 1.6rem;
      font-weight: 500;
      font-family: inherit;
      line-height: 2.2rem;
    `,
    bodyBold: `
      font-size: 1.6rem;
      font-weight: bold;
      font-family: inherit;
    `,
    caption: `
      font-size: 1.4rem;
      font-weight: 500;
      font-family: inherit;
    `,
    button: `
      font-size: 1.4rem;
      font-weight: 500;
      font-family: inherit;
    `,
    badge: `
      font-size: 1.2rem;
      font-weight: 500;
      font-family: inherit;
    `,
  },
  boxShadow: {
    shadow04: `0 0.4rem 0.4rem rgba(0, 0, 0, 0.12)`,
    shadow08: `0 0.4rem 0.6rem rgba(0, 0, 0, 0.12), 0 0.8rem 1.2rem rgba(0, 0, 0, 0.08)`,
    shadow12: `0 0.6rem 0.9rem rgba(0, 0, 0, 0.12), 0 1.2rem 1.8rem rgba(0, 0, 0, 0.08)`,
    shadow16: `0 1.6rem 2.4rem rgba(0, 0, 0, 0.12), 0 0.8rem 1.2rem rgba(0, 0, 0, 0.2)`,
    shadow20: `0 2rem 3rem rgba(0, 0, 0, 0.12), 0 1rem 1.5rem rgba(0, 0, 0, 0.2)`,
    outlined04: `0 0 0.4rem rgba(0, 0, 0, 0.25)`,
  },
};
