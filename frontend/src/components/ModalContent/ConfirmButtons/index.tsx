import Button from '@/components/common/Button/Button';
import ModalWrapper from '@/components/common/Modal/ModalWrapper';
import * as S from './ConfirmButtons.styled';

interface ConfirmButtonsProps {
  handleModalClose: () => void;
  handleSolutionDelete: () => void;
}

export default function ConfirmButtons({
  handleModalClose,
  handleSolutionDelete,
}: ConfirmButtonsProps) {
  return (
    <S.DeleteModalContainer>
      <ModalWrapper.Title>풀이를 삭제할까요?</ModalWrapper.Title>
      <S.ModalButtonWrapper>
        <Button onClick={handleModalClose}>취소</Button>
        <Button variant="primary" onClick={handleSolutionDelete}>
          삭제
        </Button>
      </S.ModalButtonWrapper>
    </S.DeleteModalContainer>
  );
}
