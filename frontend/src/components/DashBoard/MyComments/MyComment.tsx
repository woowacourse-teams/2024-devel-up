import { MyComments } from '@/types';
import { formatDateString } from '@/utils/formatDateString';
import * as S from './MyComments.styled';
import CommentIcon from '@/assets/images/comment-count.svg';
import { useNavigate } from 'react-router-dom';

export default function MyComment({
  solutionId,
  content,
  createdAt,
  solutionTitle,
  solutionCommentCount,
}: Omit<MyComments, 'id'>) {
  const commentDate = formatDateString(createdAt);

  return (
    <S.CommentWrapper to={`/solutions/${solutionId}`}>
      <S.TextWrapper>
        <S.CommentText>{content}</S.CommentText>
        <S.SubText>{commentDate}</S.SubText>
        <S.SubText>{solutionTitle}</S.SubText>
      </S.TextWrapper>
      <S.CommentCountWrapper>
        <CommentIcon width={14} height={14} />
        <S.CommentCountText>{solutionCommentCount}</S.CommentCountText>
      </S.CommentCountWrapper>
    </S.CommentWrapper>
  );
}
