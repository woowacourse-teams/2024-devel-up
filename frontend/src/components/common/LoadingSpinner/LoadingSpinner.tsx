import * as S from './LoadingSpinner.styled';
import ScrollPreventer from '../Modal/ScrollPreventer';

export default function LoadingSpinner() {
  return (
    <ScrollPreventer>
      <S.Container>
        <S.ThreeBody>
          <S.Dot />
          <S.Dot />
          <S.Dot />
        </S.ThreeBody>
      </S.Container>
    </ScrollPreventer>
  );
}
