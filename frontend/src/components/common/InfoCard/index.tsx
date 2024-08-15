import type { HashTag } from '@/types';
import Badge from '../Badge';
import Card from '../Card';
import * as S from './InfoCard.styled';
import useDragScroll from '@/hooks/useDragScroll';
import React from 'react';

interface InfoCardProps {
  id: number;
  thumbnailSrc: string;
  title: string;
  thumbnailFallbackText: string;
  description?: string;
  hashTags: HashTag[];
}

export default function InfoCard({
  id,
  thumbnailSrc,
  title,
  description,
  hashTags,
  thumbnailFallbackText,
}: InfoCardProps) {
  const { onMouseDown, onMouseMove, onMouseUp, inActive, isDragging } =
    useDragScroll<HTMLUListElement>();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.preventDefault();
    }
  };

  return (
    <Card
      key={id}
      thumbnailSrc={thumbnailSrc}
      thumbnailFallbackText={thumbnailFallbackText}
      contentElement={
        <S.InfoCardContainer onClick={handleClick}>
          <S.TitleWrapper>
            <S.Title>{title}</S.Title>
            <S.Description>{description}</S.Description>
          </S.TitleWrapper>
          <S.TagWrapper
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={inActive}
          >
            {hashTags &&
              hashTags.map((tag) => {
                return (
                  <li key={tag.id}>
                    <Badge text={`# ${tag.name}`} />
                  </li>
                );
              })}
          </S.TagWrapper>
        </S.InfoCardContainer>
      }
    />
  );
}
