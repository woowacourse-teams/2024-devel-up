import * as S from './SubmitButton.styled';
import type { ButtonHTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function SubmitButton({ ...props }: SubmitButtonProps) {
  const navigate = useNavigate();
  const handleNavigateToSubmit = () => {
    navigate(`${ROUTES.solutions}`);
  };

  return (
    <S.Container>
      <S.Button type="submit" onClick={handleNavigateToSubmit} {...props}>
        제출
      </S.Button>
    </S.Container>
  );
}
