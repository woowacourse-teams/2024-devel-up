import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UpArrow from '@/assets/images/upArrow.svg';
import * as S from './ScrollToTopButton.styled';
import { useIsFetching } from '@tanstack/react-query';

export function ScrollToTopButton() {
  const { pathname } = useLocation();
  const isFetching = useIsFetching();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isFetching > 0) {
    return null;
  }

  return (
    <S.ScrollButton onClick={handleScrollToTop}>
      <UpArrow />
    </S.ScrollButton>
  );
}
