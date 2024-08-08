import * as S from './OneWord.styled';
import TextArea from '../common/TextArea/TextArea';
import type { TextareaHTMLAttributes } from 'react';

interface OneWordProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  danger: boolean;
}

export default function OneWord({ danger, ...props }: OneWordProps) {
  return (
    <S.Container>
      <S.Title>구현 방식에 대한 설명</S.Title>
      <TextArea danger={danger} {...props} />
    </S.Container>
  );
}
