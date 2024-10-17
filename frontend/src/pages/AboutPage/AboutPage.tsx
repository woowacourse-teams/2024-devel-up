import * as S from './AboutPage.styled';
import DiscussionSpace from './DiscussionSpace';
import LevelMission from './LevelMission';
import Rocket from './Rocket';
import Solution from './Solution';

export default function AboutPage() {
  return (
    <S.Container>
      <Rocket />
      <LevelMission />
      <DiscussionSpace />
      <Solution />
    </S.Container>
  );
}
