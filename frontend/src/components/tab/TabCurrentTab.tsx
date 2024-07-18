import { useTabs } from '@/hooks/useTabs';
import * as S from './Tab.styled';

export default function TabCurrentTab() {
  const { selectedIndex, tabList } = useTabs();

  return (
    <S.TabCurrentContentContainer>{tabList[selectedIndex].content}</S.TabCurrentContentContainer>
  );
}
