import type { InputHTMLAttributes } from 'react';
import * as S from './Input.styled';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  Size: 'Small' | 'Medium' | 'Large' | 'XLarge';
  Type?: 'Default';
  Danger?: boolean;
  DangerMessage?: string;
}

export default function Input({
  Size,
  Type = 'Default',
  Danger = false,
  DangerMessage = '',
  ...props
}: InputProps) {
  return (
    <>
      <S.Input Size={Size} Type={Type} Danger={Danger} {...props} />
      {Danger && DangerMessage && <S.DangerText>{DangerMessage}</S.DangerText>}
    </>
  );
}
