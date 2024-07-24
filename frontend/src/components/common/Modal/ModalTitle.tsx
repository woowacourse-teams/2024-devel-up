import * as S from './Modal.styled';
import type { PropsWithChildren } from 'react';

export default function ModalTitle({ children }: PropsWithChildren) {
  return <S.TitleText>{children}</S.TitleText>;
}
