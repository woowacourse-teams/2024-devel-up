import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary50: string;
      primary100: string;
      primary200: string;
      primary300: string;
      primary400: string;
      primary500: string;
      primary600: string;
      primary700: string;
      primary800: string;
      primary900: string;
      danger50: string;
      danger100: string;
      danger200: string;
      danger300: string;
      danger400: string;
      danger500: string;
      danger600: string;
      danger700: string;
      danger800: string;
      danger900: string;
      grey50: string;
      grey100: string;
      grey200: string;
      grey300: string;
      grey400: string;
      grey500: string;
      grey600: string;
      grey700: string;
      grey800: string;
      grey900: string;

      whiteColor: string;
      blackColor: string;
    };
    font: {
      heading1: string;
      heading2: string;
      heading3: string;
      subHeading: string;
      body: string;
      bodyBold: string;
      caption: string;
      button: string;
      badge: string;
    };
    boxShadow: {
      shadow04: string;
      shadow08: string;
      shadow12: string;
      shadow16: string;
      shadow20: string;
      outlined04: string;
    };
  }
}
