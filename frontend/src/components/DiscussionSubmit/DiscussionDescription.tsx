import TextArea from '@/components/common/TextArea/TextArea';
import * as S from './DiscussionSubmit.style';
import type { TextareaHTMLAttributes } from 'react';

interface DiscussionDescriptionProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  danger: boolean;
}

export default function DiscussionDescription({ danger, ...props }: DiscussionDescriptionProps) {
  return (
    <S.DiscussionDescriptionContainer>
      <S.DiscussionDescriptionTitle>내용</S.DiscussionDescriptionTitle>
      <TextArea danger={danger} {...props} />
    </S.DiscussionDescriptionContainer>
  );
}
