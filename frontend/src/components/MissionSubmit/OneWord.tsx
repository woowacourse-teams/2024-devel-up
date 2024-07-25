import * as S from './OneWord.styled';
import TextArea from '../common/TextArea/TextArea';
import { TextareaHTMLAttributes } from 'react';

interface OneWordProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  danger: boolean;
}

export default function OneWord({ danger, ...props }: OneWordProps) {
  return (
    <S.Container>
      <S.Title>리뷰어에게 한마디</S.Title>
      <TextArea danger={danger} {...props} />
    </S.Container>
  );
}
