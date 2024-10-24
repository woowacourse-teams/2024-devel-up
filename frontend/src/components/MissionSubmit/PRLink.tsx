import * as S from './PRLink.styled';
import Input from '../common/Input/Input';
import type { ChangeEventHandler } from 'react';
import { ERROR_MESSAGE } from '@/constants/messages';

interface PRLinkProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  missionId: number;
  danger: boolean;
}

export default function PRLink({ missionId, value, onChange, danger }: PRLinkProps) {
  return (
    <S.Container>
      <S.Title htmlFor="prLink">Github PR 링크</S.Title>
      <Input
        id="prLink"
        width="xlarge"
        danger={danger}
        dangerMessage={ERROR_MESSAGE.invalid_pr}
        placeholder={`https://github.com/develup-mission/baseball-game/pull/${missionId}`}
        value={value}
        onChange={onChange}
      />
    </S.Container>
  );
}
