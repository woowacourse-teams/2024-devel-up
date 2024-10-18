import { useState } from 'react';
import * as S from './MissionProcess.styled';
import LeftArrow from '@/assets/images/smallLeftArrow.svg';
import RightArrow from '@/assets/images/smallRightArrow.svg';
import { GithubIcon } from '@/components/MissionSubmit/SubmitBanner.styled';
import Button from '@/components/common/Button/Button';
import ModalContent from '../index';

const CONTENT_LIST = [
  {
    id: 1,
    image: 'https://dp71rnme1p14w.cloudfront.net/howToLogin(1).webp',
    content: `우측 상단 **[로그인]** 버튼을 클릭해서 로그인을 수행해주세요.\n
로그인을 성공적으로 마치면 **[미션 시작하기]** 버튼을 클릭해서 미션을 시작할 수 있어요.`,
  },
  {
    id: 2,
    image: 'https://dp71rnme1p14w.cloudfront.net/howToGoRepo.webp',
    content: `**[코드 보러 가기]** 버튼을 클릭해 풀고자하는 미션 저장소로 이동해주세요.`,
  },
  {
    id: 3,
    image: 'https://dp71rnme1p14w.cloudfront.net/how-to-read-docs.webp',
    content: `미션 저장소에서 **[미션 진행 가이드 문서]**를 확인할 수 있어요. 가이드 문서를 확인하여 코드를 작성해주세요.`,
  },
  {
    id: 4,
    image: 'https://dp71rnme1p14w.cloudfront.net/howToStart(1).webp',
    content: `미션 구현이 완료되면 **[풀이 제출하기]** 버튼을 클릭하여 풀이를 제출해주세요.\n
풀이 제출하기 버튼은 **[미션 시작하기]** 버튼을 누른 상태일때만 확인 가능해요.`,
  },
];

interface MissionProcessProps {
  handleModalClose: () => void;
  onClick: () => void;
}

export default function MissionProcess({ handleModalClose, onClick }: MissionProcessProps) {
  const [contentId, setContentId] = useState(1);
  const currentContent = CONTENT_LIST.find((content) => content.id === contentId);
  if (!currentContent) throw new Error();
  console.log(contentId);

  const isEndContent = contentId === CONTENT_LIST.length;

  const handleNextMissionProcess = () => {
    setContentId((prev) => Math.min(prev + 1, CONTENT_LIST.length));
  };

  const handlePreviousMissionProcess = () => {
    setContentId((prev) => Math.max(prev - 1, 1));
  };

  return (
    <S.MissionProcessContentContainer
      aria-atomic="true"
      aria-live="polite"
      aria-label={currentContent.content}
    >
      <S.CloseIconWrapper onClick={handleModalClose} aria-label="진행 방법 설명 대화상자 닫기">
        <S.CloseIcon />
      </S.CloseIconWrapper>
      <S.ContentWrapper>
        <S.Title>어떻게 진행하나요?</S.Title>
        <ModalContent contentImage={currentContent.image} content={currentContent.content} />
        <S.ButtonWrapper>
          {isEndContent ? (
            <>
              <Button onClick={onClick}>
                <GithubIcon />
                미션 코드 보러 가기
              </Button>
            </>
          ) : (
            <>
              {contentId > 1 ? (
                <S.LeftArrowButton
                  onClick={handlePreviousMissionProcess}
                  aria-label="이전 페이지 보기"
                >
                  <LeftArrow />
                  Prev
                </S.LeftArrowButton>
              ) : null}

              <S.RightArrowButton onClick={handleNextMissionProcess} aria-label="다음 페이지 보기">
                Next
                <RightArrow />
              </S.RightArrowButton>
            </>
          )}
        </S.ButtonWrapper>
      </S.ContentWrapper>
    </S.MissionProcessContentContainer>
  );
}
