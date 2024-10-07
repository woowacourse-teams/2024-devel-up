import * as S from './SolutionSection.styled';
import type { Solution } from '@/types/solution';
import Button from '@/components/common/Button/Button';
import SolutionDetailHeader from './SolutionDetailHeader';
import { useSolutionDelete } from '@/hooks/useSolutionDelete';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import Modal from '@/components/common/Modal/Modal';
import useModal from '@/hooks/useModal';
import ModalWrapper from '@/components/common/Modal/ModalWrapper';

interface SolutionDetailProps {
  solution: Solution;
}

export default function SolutionSection({ solution }: SolutionDetailProps) {
  const { id: solutionId, description, url, mission } = solution;
  // 수정, 삭제 잘 되는지 dev에서 확인 필요합니다. @프룬
  const { solutionDeleteMutation } = useSolutionDelete();

  const navigate = useNavigate();
  const handleNavigateToModifySolution = () => {
    navigate(`${ROUTES.submitSolution}/${mission.id}?solutionId=${solutionId}`);
  };

  const { isModalOpen, handleModalClose, handleModalOpen } = useModal();

  const handleSolutionDelete = () => {
    solutionDeleteMutation(solutionId);
    handleModalClose();
  };

  return (
    <section>
      <S.SolutionDetailTitle>📝 Solutions</S.SolutionDetailTitle>
      <SolutionDetailHeader solution={solution} />
      <S.CodeViewButtonWrapper>
        <S.CodeViewButtonLink to={url} target="_blank">
          <Button variant="default">
            <S.GithubIcon />
            코드 보러 가기
          </Button>
        </S.CodeViewButtonLink>
      </S.CodeViewButtonWrapper>
      <S.SolutionDescription>{description}</S.SolutionDescription>
      <S.SolutionDescriptionBottom>
        <Button variant="defaultText" onClick={() => handleNavigateToModifySolution()}>
          수정
        </Button>
        <Button variant="defaultText" onClick={handleModalOpen}>
          삭제
        </Button>
      </S.SolutionDescriptionBottom>

      <Modal isModalOpen={isModalOpen}>
        <S.DeleteModalContainer>
          <ModalWrapper.Title>풀이를 삭제할까요?</ModalWrapper.Title>
          <S.ModalButtonWrapper>
            <Button onClick={handleModalClose}>취소</Button>
            <Button variant="primary" onClick={handleSolutionDelete}>
              삭제
            </Button>
          </S.ModalButtonWrapper>
        </S.DeleteModalContainer>
      </Modal>
    </section>
  );
}
