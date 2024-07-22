import Modal from '../common/Modal/Modal';
import * as S from './SuccessMissionSubmitPopUp.styled';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { fadeIn, fadeOut } from '../common/Modal/Modal.styled';
import MissionImage from '../MissionSubmit/MissionThumbnail';

interface SuccessMissionSubmitPopUpProps {
  isModalOpen: boolean;
  thumbnail: string;
}

// TODO 컴포넌트명 너무 긴거 같은데 수정해야할 것 같아요.. 추천 부탁드립니다 @버건디

export default function SuccessMissionSubmitPopUp({
  isModalOpen,
  thumbnail,
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
            <S.SubmitPopUpContainer>
              <Modal.SubTitle>미션 제출에 성공했어요!</Modal.SubTitle>
              <Modal.Title>페어 매칭에 성공하면 알려드릴게요!</Modal.Title>
              <S.MissionImgWrapper>
                <S.MissionImg
                  src={
                    'https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg'
                  }
                />
              </S.MissionImgWrapper>
              <S.SubmitButtonContainer>
                <S.SubmitButton onClick={handleNavigateToHome}>메인으로</S.SubmitButton>
              </S.SubmitButtonContainer>
            </S.SubmitPopUpContainer>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal.Portal>
    </Modal>
  );
}
