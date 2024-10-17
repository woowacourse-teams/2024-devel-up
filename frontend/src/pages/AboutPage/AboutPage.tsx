import { useRef } from 'react';
import * as S from './AboutPage.styled';
import DiscussionSpace from './DiscussionSpace';
import LevelMission from './LevelMission';
import Rocket from './Rocket';
import Solution from './Solution';

export default function AboutPage() {
  const levelMissionRef = useRef<HTMLOptionElement>(null);

  const handleScrollDown = () => {
    if (levelMissionRef.current) {
      levelMissionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <S.Container>
      <Rocket handleScrollDown={handleScrollDown} />
      <LevelMission ref={levelMissionRef} />
      <DiscussionSpace />
      <Solution />
    </S.Container>
  );
}
