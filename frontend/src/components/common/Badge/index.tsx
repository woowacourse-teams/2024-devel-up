import type { HTMLAttributes } from 'react';
import * as S from './Badge.styled';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  fontColor?: string;
  backgroundColor?: string;
}

export default function Badge({
  text,
  fontColor = 'black',
  backgroundColor = 'var(--primary-100)',
}: BadgeProps) {
  return (
    <S.BadgeContainer $fontColor={fontColor} $backgroundColor={backgroundColor}>
      {text}
    </S.BadgeContainer>
  );
}
