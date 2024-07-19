import { useTabs } from '@/hooks/useTabs';
import type { PropsWithChildren } from 'react';
import * as S from './Tab.styled';

interface TabProps extends PropsWithChildren {
  index: number;
}

export default function TabHeader({ index, children }: TabProps) {
  const { selectedIndex, handleSelectedIndex } = useTabs();
  return (
    <S.TabContainer isSelected={selectedIndex === index} onClick={() => handleSelectedIndex(index)}>
      {children}
    </S.TabContainer>
  );
}
