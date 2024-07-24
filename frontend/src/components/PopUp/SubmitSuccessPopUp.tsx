import Modal from '../common/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { fadeIn, fadeOut } from '../common/Modal/Modal.styled';
import PopUpContent from './PopUpContent';

interface SuccessMissionSubmitPopUpProps {
  isModalOpen: boolean;
  thumbnail: string;
}

export default function SubmitSuccessPopUp({
  isModalOpen,
  // thumbnail,
}: SuccessMissionSubmitPopUpProps) {
  const navigate = useNavigate();

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
