import { useTabs } from '@/hooks/useTabs';
import * as S from './Tab.styled';

export default function TabCurrentContent() {
  const { selectedIndex, tabList } = useTabs();

  return <S.CurrentContentContainer>{tabList[selectedIndex].content}</S.CurrentContentContainer>;
}
