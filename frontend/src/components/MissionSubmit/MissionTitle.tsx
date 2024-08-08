import { ERROR_MESSAGE } from '@/constants/messages';
import type { ChangeEventHandler } from 'react';
import Input from '../common/Input/Input';
import * as S from './MissionTitle.styled';

interface MissionTitleProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  danger: boolean;
}

export default function MissionTitle({ danger, value, onChange }: MissionTitleProps) {
  return (
    <S.Container>
      <S.Title>제목</S.Title>
      <Input
        width="xlarge"
        danger={danger}
        dangerMessage={ERROR_MESSAGE.invalid_title}
        placeholder={'글 제목을 입력해주세요'}
        value={value}
        onChange={onChange}
      />
    </S.Container>
  );
}
