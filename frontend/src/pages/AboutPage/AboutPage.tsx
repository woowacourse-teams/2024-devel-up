import * as S from './AboutPage.styled';
import LevelMission from './LevelMission';
import Rocket from './Rocket';

export default function AboutPage() {
  return (
    <S.Container>
      <Rocket />
      <LevelMission />
    </S.Container>
  );
}
