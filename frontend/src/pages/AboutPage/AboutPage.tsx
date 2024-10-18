import React, { useRef } from 'react';
import * as S from './AboutPage.styled';
import DiscussionSpace from './DiscussionSpace';
import LevelMission from './LevelMission';
import Rocket from './Rocket';
import { useScrollComponent } from '@/hooks/useScrollComponent';
import Solution from './Solution';

export default function AboutPage() {
  const componentRefs = [
    useRef<HTMLOptionElement>(null),
    useRef<HTMLOptionElement>(null),
    useRef<HTMLOptionElement>(null),
  ];

  const { isVisible: isLevelMissionVisible } = useScrollComponent(componentRefs[0], {
    threshold: 0.5,
    index: 0,
  });

  const { isVisible: isDiscussionSpaceVisible } = useScrollComponent(componentRefs[1], {
    threshold: 0.5,
    index: 1,
  });

  const { isVisible: isSolutionVisible } = useScrollComponent(componentRefs[2], {
    threshold: 0.5,
    index: 2,
  });

  const handleScrollDown = () => {
    const nextIndex = 0;
    if (nextIndex < componentRefs.length && componentRefs[nextIndex].current) {
      componentRefs[nextIndex].current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <S.Container>
      <Rocket handleScrollDown={handleScrollDown} />
      <LevelMission ref={componentRefs[0]} isVisible={isLevelMissionVisible} />
      <DiscussionSpace ref={componentRefs[1]} isVisible={isDiscussionSpaceVisible} />
      <Solution ref={componentRefs[2]} isVisible={isSolutionVisible} />
    </S.Container>
  );
}
