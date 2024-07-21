import * as S from './PRLink.styled';

export default function PRLink() {
  return (
    <S.Container>
      <S.Title>Github PR 링크</S.Title>
      <S.Input placeholder="https://github.com/develup-mission/java-smoking/pull/1" />
    </S.Container>
  );
}
