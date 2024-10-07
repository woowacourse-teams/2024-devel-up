import * as S from './SolutionSection.styled';
import { ROUTES } from '@/constants/routes';
import Modal from '@/components/common/Modal/Modal';
import ConfirmButtons from '@/components/ModalContent/ConfirmButtons';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button/Button';
import useModal from '@/hooks/useModal';
import { useSolutionDelete } from '@/hooks/useSolutionDelete';

interface SolutionDetailBottomProps {
  missionId: number;
  solutionId: number;
}

export default function SolutionDetailBottom({ missionId, solutionId }: SolutionDetailBottomProps) {
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
      <S.SolutionDescriptionBottom>
        <Button variant="defaultText" onClick={() => handleNavigateToModifySolution()}>
          수정
        </Button>
        <Button variant="defaultText" onClick={handleModalOpen}>
          삭제
        </Button>
      </S.SolutionDescriptionBottom>

      <Modal isModalOpen={isModalOpen}>
        <ConfirmButtons handleModalClose={handleModalClose} handleConfirm={handleSolutionDelete} />
      </Modal>
    </>
  );
}
