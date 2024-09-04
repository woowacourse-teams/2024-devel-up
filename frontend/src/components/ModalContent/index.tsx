import React from 'react';
import * as S from './ModalContent.styled';

interface ModalContentProps {
  contentImage: React.ReactNode;
  content: string;
}

export default function ModalContent({ contentImage, content }: ModalContentProps) {
  return (
    <>
      {contentImage}
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
