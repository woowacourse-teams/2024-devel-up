import type { PropsWithChildren } from 'react';
import * as S from './Tab.styled';

export default function TabListWrapper({ children }: PropsWithChildren) {
  return <S.TabListContainer>{children}</S.TabListContainer>;
}
