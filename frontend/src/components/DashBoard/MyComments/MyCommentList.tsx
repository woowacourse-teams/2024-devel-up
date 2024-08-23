import type { MyComments } from '@/types';
import * as S from './MyComments.styled';
import NoContent from '../DashBoardMissionList/NoContent';
import MyComment from './MyComment';

interface MyCommentListProps {
  comments: MyComments[];
}

export default function MyCommentList({ comments }: MyCommentListProps) {
  return (
    <>
      {!comments.length ? (
        <NoContent type="comments" />
      ) : (
        <S.Container>
          {comments.map((comment) => {
            return (
              <MyComment
                key={comment.id}
                solutionId={comment.solutionId}
                solutionTitle={comment.solutionTitle}
                createdAt={comment.createdAt}
                content={comment.content}
                solutionCommentCount={comment.solutionCommentCount}
              />
            );
          })}
        </S.Container>
      )}
    </>
  );
}
