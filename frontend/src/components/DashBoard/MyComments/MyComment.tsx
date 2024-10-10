import { formatDateString } from '@/utils/formatDateString';
import * as S from './MyComments.styled';
// import CommentIcon from '@/assets/images/comment-count.svg';

interface MyCommentProps {
  contentId: number;
  content: string;
  createdAt: string;
  contentTitle: string;
  contentCommentCount: number;
  type: 'solutions' | 'discussions';
}

export default function MyComment({
  contentId,
  content,
  createdAt,
  contentTitle,
  // contentCommentCount,
  type,
}: MyCommentProps) {
  const commentDate = formatDateString(createdAt);
  const linkUrl = `/${type}/${contentId}`;

  return (
    <S.CommentWrapper to={linkUrl}>
      <S.TextWrapper>
        <S.CommentText>{content}</S.CommentText>
        <S.SubText>{commentDate}</S.SubText>
        <S.SubText>{contentTitle}</S.SubText>
      </S.TextWrapper>
      {/* <S.CommentCountWrapper>
        <CommentIcon width={14} height={14} />
        <S.CommentCountText>{contentCommentCount}</S.CommentCountText>
      </S.CommentCountWrapper> */}
    </S.CommentWrapper>
  );
}
