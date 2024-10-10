import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UpArrow from '@/assets/images/upArrow.svg';
import * as S from './ScrollToTopButton.styled';

export function ScrollToTopButton() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <S.ScrollButton onClick={handleScrollToTop}>
      <UpArrow />
    </S.ScrollButton>
  );
}
