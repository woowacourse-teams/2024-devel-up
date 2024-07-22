import Modal from '../common/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { fadeIn, fadeOut } from '../common/Modal/Modal.styled';
import PopUpContent from './PopUpContent';

interface SuccessMissionSubmitPopUpProps {
  isModalOpen: boolean;
  thumbnail: string;
}

// TODO 컴포넌트명 너무 긴거 같은데 수정해야할 것 같아요.. 추천 부탁드립니다 @버건디

export default function SuccessMissionSubmitPopUp({
  isModalOpen,
  // thumbnail,
}: SuccessMissionSubmitPopUpProps) {
  const navigate = useNavigate();

  // TODO 함수명
  const handleNavigateToHome = () => {
    navigate(ROUTES.main);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      $mountAnimation={fadeIn}
      $unMountAnimation={fadeOut}
      $animationTime={300}
    >
      <Modal.Portal id="modal">
        <Modal.Backdrop opacity="rgba(0, 0, 0, 0.3)">
          <Modal.Container>
            <PopUpContent onClick={handleNavigateToHome} />
          </Modal.Container>
        </Modal.Backdrop>
      </Modal.Portal>
    </Modal>
  );
}
