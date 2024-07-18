import { useTabs } from '@/hooks/useTabs';
import { PropsWithChildren } from 'react';
import * as S from './Tab.styled';

interface TabProps extends PropsWithChildren {
  index: number;
}

export default function Tab({ index, children }: TabProps) {
  const { selectedIndex, handleSelectedIndex } = useTabs();
  return (
    <S.TabContainer selected={selectedIndex === index} onClick={() => handleSelectedIndex(index)}>
      {children}
    </S.TabContainer>
  );
}
