import useCarousel from '@/hooks/useCarousel';
import type { PropsWithChildren } from 'react';
import * as S from './Carousel.styled';

export default function Carousel({ children }: PropsWithChildren) {
  const {
    carouselItems,
    trackRef,
    currentIndex,
    isAnimating,
    handleNextSlide,
    handlePreviousSlide,
  } = useCarousel({ children });

  return (
    <S.Container>
      <S.SlideWrapper>
        <S.SlideTrack ref={trackRef} currentIndex={currentIndex} isAnimating={isAnimating}>
          {carouselItems.map((item, index) => (
            <S.Slide key={`original-${index}`}>{item}</S.Slide>
          ))}
          {carouselItems.map((item, index) => (
            <S.Slide key={`clone-${index}`}>{item}</S.Slide>
          ))}
        </S.SlideTrack>
      </S.SlideWrapper>
      <S.PreviousButton onClick={handlePreviousSlide}>이전</S.PreviousButton>
      <S.NextButton onClick={handleNextSlide}>다음</S.NextButton>
    </S.Container>
  );
}
