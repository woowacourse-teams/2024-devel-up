import type { Meta, StoryObj } from '@storybook/react';
import Input from '../Input';

const meta = {
  title: 'Common/Input',
  component: Input,
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
    width: {
      control: { type: 'select' },
      options: ['Small', 'Medium', 'Large', 'XLarge'],
    },
    type: {
      control: { type: 'select' },
      options: ['Default'],
    },
    danger: { control: 'boolean' },
    dangerMessage: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 'medium',
    type: 'default',
    danger: false,
    dangerMessage: '',
  },
};

export const Small: Story = {
  args: {
    width: 'small',
    type: 'default',
    danger: false,
    dangerMessage: '',
  },
};

export const Large: Story = {
  args: {
    width: 'large',
    type: 'default',
    danger: false,
    dangerMessage: '',
  },
};

export const XLarge: Story = {
  args: {
    width: 'xlarge',
    type: 'default',
    danger: false,
    dangerMessage: '',
  },
};

export const WithError: Story = {
  args: {
    width: 'medium',
    type: 'default',
    danger: true,
    dangerMessage: '에러 메세지입니다.',
  },
};
