import type { InputHTMLAttributes } from 'react';
import * as S from './Input.styled';

// TODO 일단 Danger로 두긴 했는데,
// isError와 ErrorMessage 네이밍은 어떠실지 여쭙습니다 @버건디

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
