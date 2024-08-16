import type { PropsWithChildren } from 'react';
import * as S from './HashTagButton.styled';

export default function HashTagButton({ children }: PropsWithChildren) {
  return <S.Button>{children}</S.Button>;
}
