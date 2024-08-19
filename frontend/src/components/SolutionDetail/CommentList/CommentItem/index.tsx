import type { Comment } from '@/types';
import * as S from '../CommentList.styled';
import useUserInfo from '@/hooks/useUserInfo';
import CommentUserInfo from './CommentUserInfo';
import CommentReplySection from './CommentReplySection';

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const { content, member, isDeleted } = comment;

  const { data: userInfo } = useUserInfo();

  return (
    <S.CommentItemContainer>
      <S.CommentContentWrapper>
        {isDeleted ? (
          <S.DeletedComment>삭제된 댓글입니다.</S.DeletedComment>
        ) : (
          <>
            <CommentUserInfo member={member} />
            <S.CommentContent source={content} />
          </>
        )}
      </S.CommentContentWrapper>
      <CommentReplySection parentComment={comment} isLoggedIn={Boolean(userInfo)} />
    </S.CommentItemContainer>
  );
}
