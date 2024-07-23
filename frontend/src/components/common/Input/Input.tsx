import type { InputHTMLAttributes } from 'react';
import * as S from './Input.styled';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width: 'Small' | 'Medium' | 'Large' | 'XLarge';
  type?: 'Default';
  danger?: boolean;
  dangerMessage?: string;
}

export default function Input({
  width,
  type = 'Default',
  danger = false,
  dangerMessage = '',
  ...props
}: InputProps) {
  return (
    <>
      <S.Input $width={width} $type={type} $danger={danger} {...props} />
      {danger && dangerMessage && <S.DangerText>{dangerMessage}</S.DangerText>}
    </>
  );
}
