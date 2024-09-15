import type { HTMLAttributes, PropsWithChildren } from 'react';
import * as S from './TagButton.styled';

interface TagButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isSelected?: boolean;
}

export default function TagButton({
  isSelected = false,
  children,
  ...props
}: PropsWithChildren<TagButtonProps>) {
  return (
    <S.Button $isSelected={isSelected} {...props}>
      {children}
    </S.Button>
  );
}
