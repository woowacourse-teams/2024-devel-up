import NoContent from '../DashBoardMissionList/NoContent';
import type { DiscussionComment } from '@/types/dashboard';
import MyComment from '../MyComments/MyComment';
import * as S from '../MyComments/MyComments.styled';

interface DiscussionCommentListProps {
  discussionCommentList: DiscussionComment[];
}

export default function DiscussionCommentList({
  discussionCommentList,
}: DiscussionCommentListProps) {
  return (
    <>
      {!discussionCommentList.length ? (
        <NoContent type="comments" />
      ) : (
        <S.Container>
          {discussionCommentList.map((discussionComment) => {
            return (
              <MyComment
                key={discussionComment.id}
                type="discussions"
                contentId={discussionComment.discussionId}
                contentTitle={discussionComment.discussionTitle}
                createdAt={discussionComment.createdAt}
                content={discussionComment.content}
                contentCommentCount={discussionComment.discussionCommentCount}
              />
            );
          })}
        </S.Container>
      )}
    </>
  );
}
