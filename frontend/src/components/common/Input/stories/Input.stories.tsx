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
    Size: {
      control: { type: 'select' },
      options: ['Small', 'Medium', 'Large', 'XLarge'],
    },
    Type: {
      control: { type: 'select' },
      options: ['Default'],
    },
    Danger: { control: 'boolean' },
    DangerMessage: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    Size: 'Medium',
    Type: 'Default',
    Danger: false,
    DangerMessage: '',
  },
};

export const Small: Story = {
  args: {
    Size: 'Small',
    Type: 'Default',
    Danger: false,
    DangerMessage: '',
  },
};

export const Large: Story = {
  args: {
    Size: 'Large',
    Type: 'Default',
    Danger: false,
    DangerMessage: '',
  },
};

export const XLarge: Story = {
  args: {
    Size: 'XLarge',
    Type: 'Default',
    Danger: false,
    DangerMessage: '',
  },
};

export const WithError: Story = {
  args: {
    Size: 'Medium',
    Type: 'Default',
    Danger: true,
    DangerMessage: '에러 메세지입니다.',
  },
};
