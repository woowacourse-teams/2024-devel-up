import * as S from './DiscussionDetail.styled';
import { ROUTES } from '@/constants/routes';
import Modal from '@/components/common/Modal/Modal';
import ConfirmButtons from '@/components/ModalContent/ConfirmButtons';
import { useNavigate } from 'react-router-dom';
import useModal from '@/hooks/useModal';
import Button from '@/components/common/Button/Button';
import { useDiscussionDelete } from '@/hooks/useDiscussionDelete';

interface DiscussionDetailBottomProps {
  discussionId: number;
}

export default function DiscussionDetailBottom({ discussionId }: DiscussionDetailBottomProps) {
  const navigate = useNavigate();

  const handleNavigateToUpdateDiscussion = () => {
    navigate(`${ROUTES.submitDiscussion}?discussionId=${discussionId}`);
  };

  const { isModalOpen, handleModalClose, handleModalOpen } = useModal();
  const { discussionDeleteMutation } = useDiscussionDelete();

  const handleDiscussionDeleteCallback = () => {
    handleModalClose();
    navigate(ROUTES.discussions);
  };

  const handleDiscussionDelete = () => {
    discussionDeleteMutation(discussionId, handleDiscussionDeleteCallback);
  };

  return (
    <>
      <S.DiscussionDetailBottom>
        <Button variant="defaultText" onClick={() => handleNavigateToUpdateDiscussion()}>
          수정
        </Button>
        <Button variant="defaultText" onClick={handleModalOpen}>
          삭제
        </Button>
      </S.DiscussionDetailBottom>

      <Modal isModalOpen={isModalOpen}>
        <ConfirmButtons
          handleModalClose={handleModalClose}
          handleConfirm={handleDiscussionDelete}
        />
      </Modal>
    </>
  );
}
