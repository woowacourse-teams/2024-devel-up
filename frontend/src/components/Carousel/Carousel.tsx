import type { PropsWithChildren } from 'react';
import * as S from './Carousel.styled';
import useCarousel from '@/hooks/useCarousel';
import LeftArrow from '@/assets/images/leftArrow.svg';
import RightArrow from '@/assets/images/rightArrow.svg';

interface CarouselProps extends PropsWithChildren {
  autoPlay?: boolean;
  autoSpeed?: number;
  infinite?: boolean;
}

export default function Carousel({
  autoPlay = false,
  autoSpeed = 3000,
  infinite = true,
  children,
}: CarouselProps) {
  const { carouselItems, trackRef, currentIndex, isSliding, handleNextSlide, handlePreviousSlide } =
    useCarousel({ autoPlay, autoSpeed, infinite, children });

  return (
    <S.Container>
      <S.SlideWrapper>
        <S.SlideTrack ref={trackRef} $currentIndex={currentIndex} $isSliding={isSliding}>
          {carouselItems.map((item, index) => (
            <S.Slide key={`original-${index}`}>{item}</S.Slide>
          ))}
          {carouselItems.map((item, index) => (
            <S.Slide key={`clone-${index}`}>{item}</S.Slide>
          ))}
        </S.SlideTrack>
      </S.SlideWrapper>
      <S.PreviousButton onClick={handlePreviousSlide}>
        <LeftArrow width={30} height={30} />
      </S.PreviousButton>
      <S.NextButton onClick={handleNextSlide}>
        <RightArrow width={30} height={30} />
      </S.NextButton>
    </S.Container>
  );
}
