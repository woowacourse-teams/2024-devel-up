import { useState } from 'react';
import * as S from './ModalProcess.styled';
import LeftArrow from '@/assets/images/smallLeftArrow.svg';
import RightArrow from '@/assets/images/smallRightArrow.svg';
import ContentImage from '@/assets/images/contentImage.svg';
import Button from '@/components/common/Button/Button';
import { GithubIcon } from '@/components/MissionSubmit/SubmitBanner.styled';

const CONTENT_LIST = [
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
}

export default function MissionProcess({ handleModalClose }: MissionProcessProps) {
  const [contentId, setContentId] = useState(1);
  const currentContent = CONTENT_LIST.find((content) => content.id === contentId);
  const isEndContent = contentId === CONTENT_LIST.length;

  const handleNextMissionProcess = () => {
    setContentId((prev) => Math.min(prev + 1, CONTENT_LIST.length));
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
      <S.Text>{currentContent?.content}</S.Text>{' '}
      {/* TODO 현재 공통 컴포넌트 설정에는 아이콘 위치 같은게 고정이 되어있어서 일단 기본 태그로 구현해놓습니다 @버건디 */}
      <S.ButtonWrapper>
        {isEndContent ? (
          <>
            <Button type="icon" content="미션 코드 보러 가기">
              <GithubIcon />
            </Button>
          </>
        ) : (
          <>
            <S.Button onClick={handlePreviousMissionProcess}>
              <LeftArrow />
              Prev
            </S.Button>
            <S.RightButton onClick={handleNextMissionProcess}>
              Next
              <RightArrow />
            </S.RightButton>
          </>
        )}
      </S.ButtonWrapper>
    </S.MissionProcessContentContainer>
  );
}
