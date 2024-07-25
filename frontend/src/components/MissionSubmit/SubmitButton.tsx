import * as S from './SubmitButton.styled';
import type { ButtonHTMLAttributes } from 'react';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function SubmitButton({ ...props }: SubmitButtonProps) {
  return (
    <S.Container>
      <S.Button type="submit" {...props}>
        제출
      </S.Button>
    </S.Container>
  );
}
