import { ERROR_MESSAGE } from '@/constants/messages';
import type { ChangeEventHandler } from 'react';
import Input from '@/components/common/Input/Input';
import * as S from './DiscussionSubmit.style';

interface DiscussionTitleProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  danger: boolean;
}

export default function DiscussionTitle({ danger, value, onChange }: DiscussionTitleProps) {
  return (
    <S.DiscussionTitleContainer>
      <S.DiscussionTitle>제목</S.DiscussionTitle>
      <Input
        width="xlarge"
        danger={danger}
        dangerMessage={ERROR_MESSAGE.invalid_title}
        placeholder={'글 제목을 입력해주세요'}
        value={value}
        onChange={onChange}
      />
    </S.DiscussionTitleContainer>
  );
}
