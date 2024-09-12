import type { Comments } from '@/types';
import { formatDateString } from '@/utils/formatDateString';
import * as S from './MyComments.styled';
import CommentIcon from '@/assets/images/comment-count.svg';

export default function MyComment({
  contentId,
  content,
  createdAt,
  contentTitle,
  contentCommentCount,
}: Omit<Comments, 'id'>) {
  const commentDate = formatDateString(createdAt);

  return (
    <S.CommentWrapper to={`/solutions/${contentId}`}>
      <S.TextWrapper>
        <S.CommentText>{content}</S.CommentText>
        <S.SubText>{commentDate}</S.SubText>
        <S.SubText>{contentTitle}</S.SubText>
      </S.TextWrapper>
      <S.CommentCountWrapper>
        <CommentIcon width={14} height={14} />
        <S.CommentCountText>{contentCommentCount}</S.CommentCountText>
      </S.CommentCountWrapper>
    </S.CommentWrapper>
  );
}
