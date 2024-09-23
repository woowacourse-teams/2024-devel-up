import type { HTMLAttributes, PropsWithChildren } from 'react';
import * as S from './TagButton.styled';
import type { TAG_BUTTON_VARIANTS } from '@/constants/variants';

export type TagButtonVariant = keyof typeof TAG_BUTTON_VARIANTS;

interface TagButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isSelected?: boolean;
  variant?: TagButtonVariant;
}

export default function TagButton({
  isSelected = false,
  variant = 'default',
  children,
  ...props
}: PropsWithChildren<TagButtonProps>) {
  return (
    <S.Button $isSelected={isSelected} $variant={variant} {...props}>
      {children}
    </S.Button>
  );
}
