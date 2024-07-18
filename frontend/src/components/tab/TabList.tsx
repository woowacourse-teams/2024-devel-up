import { PropsWithChildren } from 'react';
import * as S from './Tab.styled';

export default function TabList({ children }: PropsWithChildren) {
  return <S.TabListContainer>{children}</S.TabListContainer>;
}
