import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    vertical-align: baseline;
    margin: 0;
    border: 0;
    padding: 0;
    font-size: 100%;
    font: inherit;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  * {
    user-select: none;
  }
  ol,
  ul,
  li {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: “”;
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    cursor: pointer;
    outline: none;
    border: none;
    background-color: inherit;
    padding: 0;
    color: inherit;
    font-weight: inherit;
    font-size: inherit;
  }
  input[type=“text”] {
    padding: 0;
    padding-inline: 0;
    padding-block: 0;
  }
  input{
    border:none;
    outline : none;
  }
  textarea{
    resize : none;
    border:none;
    outline:none;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 62.5%;
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }


  //TODO 이렇게 부드럽게 렌더링 되는거에 대해서 이야기 필요성 @버건디
  @keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

body {
  animation: fadeIn 0.2s ease-in-out;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}

body::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}

  li {
    list-style: none;
  }
  button {
    cursor: pointer;
  }
  a:visited, a:link, a {
    text-decoration: none;
    color:black;
  }
  :root {
    --primary-50:#E7E9F8;
    --primary-100:#C4C9ED;
    --primary-200:#9CA6E1;
    --primary-300:#7383D6;
    --primary-400:#5367CD;
    --primary-500:#304CC4;
    --primary-600:#2A44B9;
    --primary-700:#1F3AAD;
    --primary-800:#1430A1;
    --primary-900:#001C8E;
    --danger-50: #FFE9EC;
    --danger-100:#FFC8CC;
    --danger-200:#F8918E;
    --danger-300: #F06461;
    --danger-400: #F93A37;
    --danger-500:#FC1D10;
    --danger-600: #EE0014;
    --danger-700: #DC000F;
    --danger-800: #D00004;
    --danger-900:#C20000;
    --grey-50:#F7F7F7;
    --grey-100:#ECECEC;
    --grey-200:#E0E0E0;
    --grey-300:#CCCCCC;
    --grey-400:#A7A7A7;
    --grey-500:#868686;
    --grey-600:#5F5F5F;
    --grey-700:#4C4C4C;
    --grey-800:#2F2F2F;
    --grey-900:#0E0E0E;
    --white-color: #FFFFFF;
    --black-color: #000000;
  }
`;

export default GlobalStyle;
