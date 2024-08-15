import type { HTMLAttributes, PropsWithChildren } from 'react';
import * as S from './HashTagButton.styled';

interface HashTagButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isSelected: boolean;
}

export default function HashTagButton({
  isSelected,
  children,
  ...props
}: PropsWithChildren<HashTagButtonProps>) {
  return (
    <S.Button $isSelected={isSelected} {...props}>
      {children}
    </S.Button>
  );
}
