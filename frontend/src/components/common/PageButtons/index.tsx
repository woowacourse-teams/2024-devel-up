import * as S from './PageButtons.styled';
import LeftArrow from '@/assets/images/smallLeftArrow.svg';
import RightArrow from '@/assets/images/smallRightArrow.svg';

interface PageButtonsOptions {
  currentPage: number;
  goToPage: (pageNum: number) => void;
  goToPreviousGroup: () => void;
  goToNextGroup: () => void;
  pageNumbers: number[];
  hasPreviousGroup: boolean;
  hasNextGroup: boolean;
}

export default function PageButtons({
  currentPage,
  goToPage,
  goToPreviousGroup,
  goToNextGroup,
  pageNumbers,
  hasPreviousGroup,
  hasNextGroup,
}: PageButtonsOptions) {
  return (
    <S.Container>
      <S.DefaultButtonWrapper onClick={goToPreviousGroup} disabled={!hasPreviousGroup}>
        <LeftArrow width={7} height={12} />
      </S.DefaultButtonWrapper>

      {pageNumbers.map((pageNum) => (
        <S.PageButtonWrapper
          $isActive={currentPage === pageNum}
          key={pageNum}
          onClick={() => goToPage(pageNum)}
        >
          {pageNum}
        </S.PageButtonWrapper>
      ))}

      <S.DefaultButtonWrapper onClick={goToNextGroup} disabled={!hasNextGroup}>
        <RightArrow width={7} height={12} />
      </S.DefaultButtonWrapper>
    </S.Container>
  );
}
