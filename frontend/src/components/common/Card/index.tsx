import type { HTMLAttributes, SyntheticEvent } from 'react';
import getPlaceholderImg from './getPlaceholderImg';
import * as S from './Card.styled';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  thumbnailSrc: string;
  thumbnailFallbackText: string;
  contentElement: React.ReactNode;
}

export default function Card({
  thumbnailSrc,
  thumbnailFallbackText,
  contentElement,
  ...attributes
}: CardProps) {
  const handleImageError = ({ target }: SyntheticEvent<HTMLImageElement>) => {
    if (target instanceof HTMLImageElement) {
      target.src = getPlaceholderImg(300, 219, thumbnailFallbackText);
    }
  };

  return (
    <S.CardContainer {...attributes}>
      <S.Thumbnail
        draggable={false}
        src={thumbnailSrc}
        onError={handleImageError}
        alt={thumbnailFallbackText}
      />
      <S.Content>{contentElement}</S.Content>
    </S.CardContainer>
  );
}
