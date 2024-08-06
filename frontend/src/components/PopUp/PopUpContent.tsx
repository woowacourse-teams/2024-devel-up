import * as S from './SubmitSuccessPopUp.styled';
import ModalWrapper from '../common/Modal/ModalWrapper';

interface PopUpContentProps {
  onClick: () => void;
}

export default function PopUpContent({ onClick }: PopUpContentProps) {
  return (
    <S.SubmitPopUpContainer>
      <ModalWrapper.SubTitle>미션 제출에 성공했어요!</ModalWrapper.SubTitle>
      <ModalWrapper.Title>페어 매칭에 성공하면 알려드릴게요!</ModalWrapper.Title>
      <S.MissionImgWrapper>
        {/* 서버에서 이미지를 제대로 못받아오고 있어서 일단 임시 이미지로 대체합니다. */}
        <S.MissionImg
          src={
            'https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg'
          }
        />
      </S.MissionImgWrapper>
      <S.SubmitButtonContainer>
        <S.SubmitButton onClick={onClick}>메인으로</S.SubmitButton>
      </S.SubmitButtonContainer>
    </S.SubmitPopUpContainer>
  );
}
