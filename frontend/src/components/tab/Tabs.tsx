import { TabsContext } from '@/hooks/useTabs';
import { PropsWithChildren, useState } from 'react';
import Tab from './Tab';
import TabList from './TabList';
import TabCurrentTab from './TabCurrentTab';
import * as S from './Tab.styled';
import { TabData } from '@/types';

interface TabsProps extends PropsWithChildren {
  tabList: TabData[];
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

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.CurrentTab = TabCurrentTab;
