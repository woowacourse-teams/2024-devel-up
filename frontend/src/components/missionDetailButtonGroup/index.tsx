import * as S from './MissionDetailButtonGroup.styled';
import { ROUTES } from '@/constants/routes';

export default function MissionDetailButtonGroup() {
  return (
    <S.MissionDetailButtonGroupContainer>
      <S.Button
        to="https://github.com/develup-mission/docs/blob/main/mission-guide.md"
        target="_blank"
      >
        미션 제출 방법
      </S.Button>
      <S.Button to="https://github.com/develup-mission/java-smoking">미션 참여하기</S.Button>
      <S.Button to={ROUTES.submit}>미션 제출하기</S.Button>
    </S.MissionDetailButtonGroupContainer>
  );
}
