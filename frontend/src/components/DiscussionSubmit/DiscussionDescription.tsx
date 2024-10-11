import TextArea from '@/components/common/TextArea/TextArea';
import * as S from './DiscussionSubmit.styled';
import type { TextareaHTMLAttributes } from 'react';

interface DiscussionDescriptionProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  danger: boolean;
  dangerMessage: string;
}

export default function DiscussionDescription({
  danger,
  dangerMessage,
  ...props
}: DiscussionDescriptionProps) {
  return (
    <S.DiscussionDescriptionContainer>
      <S.DiscussionDescriptionTitle>내용</S.DiscussionDescriptionTitle>
      <TextArea danger={danger} dangerMessage={dangerMessage} {...props} />
    </S.DiscussionDescriptionContainer>
  );
}
