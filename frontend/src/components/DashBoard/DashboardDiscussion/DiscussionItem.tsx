import * as S from './DashboardDiscussion.styled';
import type { HashTag } from '@/types';
import CommentIcon from '@/assets/images/comment-count.svg';
import { formatDateString } from '@/utils/formatDateString';

interface DiscussionItemProps {
  id: number;
  mission: string;
  hashTags?: HashTag[];
  title: string;
  imageUrl: string;
  commentCount: number;
  createdAt: string;
}

export default function DiscussionItem({
  id,
  mission,
  hashTags,
  title,
  imageUrl,
  commentCount,
  createdAt,
}: DiscussionItemProps) {
  return (
    <S.DiscussionWrapper to={`/discussions/${id}`}>
      <S.TextWrapper>
        <S.HashTagWrapper>
          {mission && <S.HashTag $isTitle>{mission}</S.HashTag>}
          {hashTags &&
            hashTags.map((hashTag) => {
              return <S.HashTag key={hashTag.id}>{hashTag.name}</S.HashTag>;
            })}
        </S.HashTagWrapper>
        <S.CommentText>{title}</S.CommentText>
        <S.SubText>{formatDateString(createdAt)}</S.SubText>
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
