import type { TabInfo } from '@/types';
import { createContext } from 'react';

export interface TabsContextProps {
  selectedIndex: number;
  handleSelectedIndex: (index: number) => void;
  tabList: TabInfo[];
}

export const TabsContext = createContext<TabsContextProps | undefined>(undefined);
