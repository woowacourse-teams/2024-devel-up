import * as S from './DiscussionDetail.styled';
import { ROUTES } from '@/constants/routes';
import Modal from '@/components/common/Modal/Modal';
import ConfirmButtons from '@/components/ModalContent/ConfirmButtons';
import { useNavigate } from 'react-router-dom';
import useModal from '@/hooks/useModal';
import { useSolutionDelete } from '@/hooks/useSolutionDelete';
import Button from '@/components/common/Button/Button';

interface SolutionBottomProps {
  missionId: number;
  solutionId: number;
}

export default function DiscussionDetailBottom({ missionId, solutionId }: SolutionBottomProps) {
  const navigate = useNavigate();

  const handleNavigateToModifySolution = () => {
    navigate(`${ROUTES.submitSolution}/${missionId}?solutionId=${solutionId}`);
  };

  const { isModalOpen, handleModalClose, handleModalOpen } = useModal();
  const { solutionDeleteMutation } = useSolutionDelete();

  const handleSolutionDelete = () => {
    solutionDeleteMutation(solutionId);
    handleModalClose();
  };

  return (
    <>
      <S.DiscussionDetailBottom>
        <Button variant="defaultText" onClick={() => handleNavigateToModifySolution()}>
          수정
        </Button>
        <Button variant="defaultText" onClick={handleModalOpen}>
          삭제
        </Button>
      </S.DiscussionDetailBottom>

      <Modal isModalOpen={isModalOpen}>
        <ConfirmButtons
          handleModalClose={handleModalClose}
          handleSolutionDelete={handleSolutionDelete}
        />
      </Modal>
    </>
  );
}
