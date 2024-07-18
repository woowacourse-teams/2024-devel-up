import { createContext, useContext } from 'react';
import { ERROR_MESSAGE } from '@/constants/messages';
import { TabData } from '@/types';

interface TabsContextProps {
  selectedIndex: number;
  handleSelectedIndex: (index: number) => void;
  tabList: TabData[];
}

// TODO 컨텍스트 폴더를 따로 뺄지 안뺄지 이야기 나눠보아야 할거 같아요 ! @버건디

export const TabsContext = createContext<TabsContextProps | undefined>(undefined);

export const useTabs = (): TabsContextProps => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(ERROR_MESSAGE.not_defined_context);
  }
  return context;
};
