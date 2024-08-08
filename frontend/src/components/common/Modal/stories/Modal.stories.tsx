import type { Meta, StoryObj } from '@storybook/react';
import ModalWrapper from '../ModalWrapper';
import PopUpContent from '@/components/PopUp/PopUpContent';

const meta = {
  title: 'Common/ModalWrapper',
  component: ModalWrapper,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
  },
} satisfies Meta<typeof ModalWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

const handleClick = () => {
  alert('팝업 컨텐츠를 클릭했어요!');
};

export const Default: Story = {
  args: {
    isOpen: true,
    children: [
      <>
        <ModalWrapper.Backdrop opacity="rgba(0, 0, 0, 0.3)">
          <ModalWrapper.Container>
            <PopUpContent onClick={handleClick} />
          </ModalWrapper.Container>
        </ModalWrapper.Backdrop>
      </>,
    ],
  },
};
