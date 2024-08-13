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
  hashTag: HashTag[];
}

const mockHashTag = [
  { id: 1, name: '111' },
  { id: 2, name: '222' },
  { id: 3, name: '333' },
  { id: 4, name: '444' },
  { id: 5, name: '555' },
  { id: 6, name: '666' },
  { id: 7, name: '777' },
  { id: 8, name: '888' },
];

export default function InfoCard({
  id,
  thumbnailSrc,
  title,
  description,
  // hashTag,
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
            {mockHashTag.map((tag) => {
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
