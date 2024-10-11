import * as S from './DiscussionSubmit.styled';

export default function DiscussionSubmitHeader() {
  return (
    <S.HeaderContainer>
      <S.DiscussionSubmitTitle>💬 디스커션</S.DiscussionSubmitTitle>
      <S.Subtitle>
        자유롭게 글을 쓰고 토론해 보세요!
        <br />
        미션과 해시 태그를 선택해도 좋아요.
      </S.Subtitle>
    </S.HeaderContainer>
  );
}
