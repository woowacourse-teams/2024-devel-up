import type { HTMLAttributes } from 'react';
import * as S from './Badge.styled';
import type { BADGE_VARIANTS } from '@/constants/variants';

export type BadgeVariant = keyof typeof BADGE_VARIANTS;

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  variant?: BadgeVariant;
}

export default function Badge({ text, variant = 'default' }: BadgeProps) {
  return <S.BadgeContainer $variant={variant}>{text}</S.BadgeContainer>;
}
