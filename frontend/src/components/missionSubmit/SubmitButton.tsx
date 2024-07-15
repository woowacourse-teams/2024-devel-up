import * as S from './SubmitButton.styled';

type SubmitButtonProps = {
  onSubmitMission: () => void;
};

export default function SubmitButton({ onSubmitMission }: SubmitButtonProps) {
  return (
    <S.Container>
      <S.Button onClick={onSubmitMission}>제출</S.Button>
    </S.Container>
  );
}
