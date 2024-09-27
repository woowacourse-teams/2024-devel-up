import type { Discussion } from '@/types';
import * as S from './DiscussionList.styled';
import Badge from '../common/Badge';

export default function DiscussionListItem({
  title,
  mission,
  hashTags,
  member,
  commentCount,
}: Omit<Discussion, 'id'>) {
  return (
    <S.ItemContainer>
      <S.ContentWrapper>
        <S.BadgeWrapper>
          {mission && <Badge text={mission} variant="danger" />}
          {hashTags.map((hashTag) => (
            <Badge key={hashTag.id} text={`# ${hashTag.name}`} />
          ))}
        </S.BadgeWrapper>
        <S.Title>{title}</S.Title>
      </S.ContentWrapper>

      <S.ItemRight>
        <S.WriterImg src={member.imageUrl} />
        <S.CommentWrapper>
          <S.CommentCountIcon />
          <p>{commentCount}</p>
        </S.CommentWrapper>
      </S.ItemRight>
    </S.ItemContainer>
  );
}
