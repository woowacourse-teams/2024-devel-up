import * as S from './SolutionDetail.styled';

export default function CommentForm() {
  const onSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <S.CommentForm onSubmit={onSubmitComment}>
      <S.CommentTextArea>
        댓글창 기본 입력 값입니다 댓글창 기본 입력 값입니다 댓글창 기본 입력 값입니다댓글창 기본
        입력 값입니다댓글창 기본 입력 값입니다댓글창 기본 입력 값입니다댓글창 기본 입력
        값입니다댓글창 기본 입력 값입니다 댓글창 기본 입력 값입니다댓글창 기본 입력 값입니다
      </S.CommentTextArea>
      <S.StartFromRight>
        <S.CommentButton>제출하기</S.CommentButton>
      </S.StartFromRight>
    </S.CommentForm>
  );
}
