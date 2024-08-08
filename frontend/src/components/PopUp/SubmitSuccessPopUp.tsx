import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import PopUpContent from './PopUpContent';
import Modal from '../common/Modal/Modal';

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
    <Modal isModalOpen={isModalOpen}>
      <PopUpContent onClick={handleNavigateToHome} />
    </Modal>
  );
}
