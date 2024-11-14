// AboutPage.tsx

import React, { useRef } from 'react';
import * as S from './AboutPage.styled';
import DiscussionSpace from './DiscussionSpace';
import LevelMission from './LevelMission';
import Rocket from './Rocket';
import Solution from './Solution';
import { useScrollComponent } from '@/hooks/useScrollComponent';

export default function AboutPage() {
  const componentRefs = [
    useRef<HTMLOptionElement>(null),
    useRef<HTMLOptionElement>(null),
    useRef<HTMLOptionElement>(null),
  ];

  const { visibleIndex } = useScrollComponent(componentRefs, {
    threshold: 0.6,
  });

  const handleScrollDown = () => {
    const nextIndex = visibleIndex ?? 0;
    if (nextIndex < componentRefs.length && componentRefs[nextIndex].current) {
      componentRefs[nextIndex].current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <S.Container>
      <Rocket handleScrollDown={handleScrollDown} />
      <LevelMission ref={componentRefs[0]} isVisible={visibleIndex === 0} />
      <DiscussionSpace ref={componentRefs[1]} isVisible={visibleIndex === 1} />
      <Solution ref={componentRefs[2]} isVisible={visibleIndex === 2} />
    </S.Container>
  );
}
