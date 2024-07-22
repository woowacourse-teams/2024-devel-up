import type { Meta, StoryObj } from '@storybook/react';
import Carousel from '../Carousel';

const meta = {
  title: 'Common/Carousel',
  component: Carousel,
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: [
      <div
        key={'1'}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <img
          src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
          width={'100%'}
          height={'100%'}
        />
      </div>,
      <div
        key={'2'}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <img
          src="https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg"
          width={'100%'}
          height={'100%'}
        />
      </div>,
      <div
        key={'3'}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <img
          src="https://cdn.pixabay.com/photo/2015/03/17/02/01/cubes-677092_1280.png"
          width={'100%'}
          height={'100%'}
        />
      </div>,
    ],
  },
};
