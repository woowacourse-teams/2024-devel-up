import type { Meta, StoryObj } from '@storybook/react';
import TextArea from '../TextArea';

const meta = {
  title: 'Common/TextArea',
  component: TextArea,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['Default'],
    },
    type: {
      control: { type: 'select' },
      options: ['Default'],
    },
    danger: { control: 'boolean' },
    dangerMessage: { control: 'text' },
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'Default',
    type: 'Default',
    danger: false,
    dangerMessage: '',
  },
};

export const WithError: Story = {
  args: {
    size: 'Default',
    type: 'Default',
    danger: true,
    dangerMessage: '에러 메세지입니다.',
  },
};
