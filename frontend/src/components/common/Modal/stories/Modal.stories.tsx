import type { Meta, StoryObj } from '@storybook/react';
import Modal from '../Modal';
import PopUpContent from '@/components/PopUp/PopUpContent';

const meta = {
  title: 'Common/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
  },
} satisfies Meta<typeof Modal>;

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
        <Modal.Backdrop opacity="rgba(0, 0, 0, 0.3)">
          <Modal.Container>
            <PopUpContent onClick={handleClick} />
          </Modal.Container>
        </Modal.Backdrop>
      </>,
    ],
  },
};
