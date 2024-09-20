import React from 'react';
import * as S from './ModalContent.styled';

interface ModalContentProps {
  contentImage: string;
  content: string;
}

export default function ModalContent({ contentImage, content }: ModalContentProps) {
  return (
    <>
      <img src={contentImage} />
      <S.Text>
        {content
          .split('**')
          .map((text, index) =>
            index % 2 === 1 ? <S.BoldText key={index}>{text}</S.BoldText> : text,
          )}
      </S.Text>
    </>
  );
}
