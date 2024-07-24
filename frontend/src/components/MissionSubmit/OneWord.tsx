import * as S from './OneWord.styled';
import TextArea from '../common/TextArea/TextArea';

export default function OneWord() {
  return (
    <S.Container>
      <S.Title>리뷰어에게 한마디</S.Title>
      <TextArea placeholder="안녕하세요, 리뷰어님. 정성스럽게 피드백 해주셔서 감사해요" />
    </S.Container>
  );
}
