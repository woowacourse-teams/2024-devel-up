import type { InputHTMLAttributes } from 'react';
import * as S from './Input.styled';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width: 'small' | 'medium' | 'large' | 'xlarge';
  type?: 'default';
  danger?: boolean;
  dangerMessage?: string;
}

export default function Input({
  width,
  type = 'default',
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
