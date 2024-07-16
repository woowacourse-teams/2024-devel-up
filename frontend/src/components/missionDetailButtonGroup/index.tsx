import { Link } from 'react-router-dom';
import * as S from './MissionDetailButtonGroup.styled';

export default function MissionDetailButtonGroup() {
  return (
    <S.MissionDetailButtonGroupContainer>
      <Link to="https://github.com/develup-mission/docs/blob/main/mission-guide.md" target="_blank">
        <S.Button>미션 제출 방법</S.Button>
      </Link>
      <Link to="https://github.com/develup-mission/java-smoking">
        <S.Button>미션 참여하기</S.Button>
      </Link>
      <Link to="/submit/1">
        <S.Button>미션 제출하기</S.Button>
      </Link>
    </S.MissionDetailButtonGroupContainer>
  );
}
