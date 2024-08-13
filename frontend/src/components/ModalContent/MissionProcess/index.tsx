import { useState } from 'react';
import * as S from './ModalProcess.styled';
import LeftArrow from '@/assets/images/smallLeftArrow.svg';
import RightArrow from '@/assets/images/smallRightArrow.svg';
import ContentImage from '@/assets/images/contentImage.svg';
import { GithubIcon } from '@/components/MissionSubmit/SubmitBanner.styled';
import ButtonSample from '@/components/common/ButtonSample/ButtonSample';

const MOCK_CONTENT_LIST = [
  {
    id: 1,
    image: '',
    content: '미션 저장소로 이동해주세요',
  },
  { id: 2, image: '', content: '미션을 포크해주세요' },
  { id: 3, image: '', content: '미션을 진행해주세요' },
  { id: 4, image: '', content: '미션을 제출해주세요' },
];

interface MissionProcessProps {
  handleModalClose: () => void;
  onClick: () => void;
}

export default function MissionProcess({ handleModalClose, onClick }: MissionProcessProps) {
  const [contentId, setContentId] = useState(1);
  const currentContent = MOCK_CONTENT_LIST.find((content) => content.id === contentId);
  const isEndContent = contentId === MOCK_CONTENT_LIST.length;

  const handleNextMissionProcess = () => {
    setContentId((prev) => Math.min(prev + 1, MOCK_CONTENT_LIST.length));
  };

  const handlePreviousMissionProcess = () => {
    setContentId((prev) => Math.max(prev - 1, 1));
  };

  return (
    <S.MissionProcessContentContainer>
      <S.CloseIconWrapper>
        <S.CloseIcon onClick={handleModalClose} />
      </S.CloseIconWrapper>
      <S.Title>어떻게 진행하나요?</S.Title>
      <ContentImage width={413} height={250} />
      <S.Text>{currentContent?.content}</S.Text>
      <S.ButtonWrapper>
        {isEndContent ? (
          <>
            <ButtonSample variant="primary" onClick={onClick}>
              <GithubIcon />
              미션 코드 보러 가기
            </ButtonSample>
          </>
        ) : (
          <>
            <S.ArrowButton onClick={handlePreviousMissionProcess}>
              <LeftArrow />
              Prev
            </S.ArrowButton>

            <S.ArrowButton onClick={handleNextMissionProcess}>
              Next
              <RightArrow />
            </S.ArrowButton>
          </>
        )}
      </S.ButtonWrapper>
    </S.MissionProcessContentContainer>
  );
}
