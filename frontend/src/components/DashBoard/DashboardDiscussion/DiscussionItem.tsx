import * as S from './DashBoardDiscussion.styled';
import { HashTag } from '@/types';
import CommentIcon from '@/assets/images/comment-count.svg';

interface DiscussionItemProps {
  id: number;
  content: string;
  hashTags: HashTag[];
  title: string;
  imageUrl: string;
  commentCount: number;
}

export default function DiscussionItem({
  id,
  content,
  hashTags,
  title,
  imageUrl,
  commentCount,
}: DiscussionItemProps) {
  return (
    <S.DiscussionWrapper to={`/discussions/${id}`}>
      <S.TextWrapper>
        <S.HashTagWrapper>
          <S.HashTag $isTitle>{title}</S.HashTag>
          {hashTags.map((hashTag) => {
            return <S.HashTag key={hashTag.id}>{hashTag.name}</S.HashTag>;
          })}
        </S.HashTagWrapper>
        <S.CommentText>{content}</S.CommentText>
      </S.TextWrapper>
      <S.ImageCommentWrapper>
        <S.ImageWrapper>
          <S.Image src={imageUrl} width={22} height={22} />
        </S.ImageWrapper>
        <S.CommentCountWrapper>
          <CommentIcon width={14} height={14} />
          <S.CommentCountText>{commentCount}</S.CommentCountText>
        </S.CommentCountWrapper>
      </S.ImageCommentWrapper>
    </S.DiscussionWrapper>
  );
}
