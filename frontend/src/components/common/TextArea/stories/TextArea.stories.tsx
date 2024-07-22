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
    Size: {
      control: { type: 'select' },
      options: ['Default'],
    },
    Type: {
      control: { type: 'select' },
      options: ['Default'],
    },
    Danger: { control: 'boolean' },
    DangerMessage: { control: 'text' },
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    Size: 'Default',
    Type: 'Default',
    Danger: false,
    DangerMessage: '',
  },
};

export const WithError: Story = {
  args: {
    Size: 'Default',
    Type: 'Default',
    Danger: true,
    DangerMessage: '에러 메세지입니다.',
  },
};
