import type { TextareaHTMLAttributes } from 'react';
import * as S from './TextArea.styled';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  Type?: 'Default';
  Size?: 'Default';
  Danger?: boolean;
  DangerMessage?: string;
}

export default function TextArea({
  Type = 'Default',
  Size = 'Default',
  Danger = false,
  DangerMessage = '',
  ...props
}: TextAreaProps) {
  return (
    <>
      <S.TextArea Type={Type} Size={Size} Danger={Danger} {...props} />
      {Danger && DangerMessage && <S.DangerText>{DangerMessage}</S.DangerText>}
    </>
  );
}
