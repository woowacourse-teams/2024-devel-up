import type { HTMLAttributes, PropsWithChildren } from 'react';
import * as S from './TagButton.styled';
import type { TAG_BUTTON_VARIANTS } from '@/constants/variants';

export type TagButtonVariant = keyof typeof TAG_BUTTON_VARIANTS;

interface TagButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isSelected?: boolean;
  variant?: TagButtonVariant;
  isClickable?: boolean;
}

export default function TagButton({
  isSelected = false,
  variant = 'default',
  isClickable = true,
  children,
  ...props
}: PropsWithChildren<TagButtonProps>) {
  return (
    <S.Button $isSelected={isSelected} $variant={variant} $isClickable={isClickable} {...props}>
      {children}
    </S.Button>
  );
}
