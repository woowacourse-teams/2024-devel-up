import { TabsContext } from '@/contexts/TabsContext';
import { useState } from 'react';
import type { PropsWithChildren } from 'react';
import TabHeader from './TabHeader';
import TabListWrapper from './TabListWrapper';
import TabCurrentContent from './TabCurrentContent';
import * as S from './Tab.styled';
import type { TabInfo } from '@/types';

interface TabsProps extends PropsWithChildren {
  tabList: TabInfo[];
}

export default function Tabs({ children, tabList }: TabsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelectedIndex = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <TabsContext.Provider value={{ selectedIndex, handleSelectedIndex, tabList }}>
      <S.TabPageContainer>{children}</S.TabPageContainer>
    </TabsContext.Provider>
  );
}

Tabs.ListWrapper = TabListWrapper;
Tabs.TabHeader = TabHeader;
Tabs.CurrentContent = TabCurrentContent;
