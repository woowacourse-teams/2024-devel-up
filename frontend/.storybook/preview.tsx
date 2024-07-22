import type { Preview } from '@storybook/react';
import GlobalStyle from '../src/styles/GlobalStyle';
import React from 'react';
import { GlobalLayout } from '../src/styles/GlobalLayout';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
};

export const decorators = [
  (Story) => (
    <GlobalLayout>
      <GlobalStyle />
      <Story />
    </GlobalLayout>
  ),
];

export default preview;
