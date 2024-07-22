import * as S from './Modal.styled';
import type { PropsWithChildren } from 'react';

export default function ModalSubTitle({ children }: PropsWithChildren) {
  return <S.SubTitleText>{children}</S.SubTitleText>;
}
