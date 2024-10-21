import UpArrow from '@/assets/images/upArrow.svg';
import * as S from './ScrollToTopButton.styled';
import { useIsFetching } from '@tanstack/react-query';
import { useScrollVisibility } from '@/hooks/useScrollVisibility';

export function ScrollToTopButton() {
  const isFetching = useIsFetching();
  const isVisible = useScrollVisibility(0);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isFetching > 0) {
    return null;
  }

  return (
    <S.ScrollButton $isVisible={isVisible} onClick={handleScrollToTop}>
      <UpArrow />
    </S.ScrollButton>
  );
}
