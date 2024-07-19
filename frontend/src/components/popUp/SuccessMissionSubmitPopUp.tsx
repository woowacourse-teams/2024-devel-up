import Modal from '../common/modal/Modal';
import * as S from './SuccessMissionSubmitPopUp.styled';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { css, keyframes } from 'styled-components';

interface SuccessMissionSubmitPopUpProps {
  isModalOpen: boolean;
}

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

// const fadeOut = keyframes`
//   from {
//     opacity: 1;
//   }
//   to {
//     opacity: 0;
//   }
// `;

// TODO 컴포넌트명 너무 긴거 같은데 수정해야할 것 같아요.. 추천 부탁드립니다 @버건디

export default function SuccessMissionSubmitPopUp({ isModalOpen }: SuccessMissionSubmitPopUpProps) {
  const navigate = useNavigate();

  // TODO 함수명
  const handleNavigateToHome = () => {
    navigate(ROUTES.main);
  };

  return (
    <Modal isOpen={isModalOpen} animationTime={500}>
      <Modal.Portal id="modal">
        <Modal.Backdrop opacity="rgba(0, 0, 0, 0.3)">
          <Modal.Container>
            <S.SubmitPopUpContainer>
              <S.PopUpMessageContainer>
                <S.PopUpMessage>미션 제출에 성공했어요!</S.PopUpMessage>
                <S.PopUpMessage>페어 매칭에 성공하면 알려드릴게요!</S.PopUpMessage>
              </S.PopUpMessageContainer>
              <S.SubmitButtonContainer>
                <S.SubmitButton onClick={handleNavigateToHome}>홈으로 돌아가기</S.SubmitButton>
              </S.SubmitButtonContainer>
            </S.SubmitPopUpContainer>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal.Portal>
    </Modal>
  );
}
