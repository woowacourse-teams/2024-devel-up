import type { TextareaHTMLAttributes } from 'react';
import * as S from './TextArea.styled';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  type?: 'Default';
  size?: 'Default';
  danger?: boolean;
  dangerMessage?: string;
}

export default function TextArea({
  type = 'Default',
  size = 'Default',
  danger = false,
  dangerMessage = '',
  ...props
}: TextAreaProps) {
  return (
    <>
      <S.TextArea $type={type} $size={size} $danger={danger} {...props} />
      {danger && dangerMessage && <S.DangerText>{dangerMessage}</S.DangerText>}
    </>
  );
}
