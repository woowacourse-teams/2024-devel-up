import * as S from './SubmitButton.styled';

interface SubmitButtonProps {
  onSubmit: () => void;
}

export default function SubmitButton({ onSubmit }: SubmitButtonProps) {
  return (
    <S.Container>
      <S.Button onClick={onSubmit}>제출</S.Button>
    </S.Container>
  );
}
