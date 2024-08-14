import Card from '../Card';
import * as S from './InfoCard.styled';

interface InfoCardProps {
  id: number;
  thumbnailSrc: string;
  title: string;
  thumbnailFallbackText: string;
  description?: string;
}

export default function InfoCard({
  id,
  thumbnailSrc,
  title,
  description,
  thumbnailFallbackText,
}: InfoCardProps) {
  return (
    <Card
      key={id}
      thumbnailSrc={thumbnailSrc}
      thumbnailFallbackText={thumbnailFallbackText}
      contentElement={
        <div>
          <S.Title>{title}</S.Title>
          <S.Description>{description}</S.Description>
        </div>
      }
    />
  );
}
