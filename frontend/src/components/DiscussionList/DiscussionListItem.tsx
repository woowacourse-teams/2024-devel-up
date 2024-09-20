import type { Discussion } from '@/types';
import * as S from './DiscussionList.styled';
import Badge from '../common/Badge';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export default function DiscussionListItem({
  title,
  mission,
  hashTags,
  member,
  commentCount,
  id,
}: Discussion) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`${ROUTES.discussions}/${id}`);
  };

  return (
    <S.DiscussionItemContainer onClick={handleNavigate}>
      <S.ContentWrapper>
        <S.BadgeWrapper>
          {/* TODO: Badge 색상 변경 필요 @프룬 */}
          <Badge text={mission} />
          {hashTags.map((hashTag) => (
            <Badge key={hashTag.id} text={`# ${hashTag.name}`} />
          ))}
        </S.BadgeWrapper>
        <S.Title>{title}</S.Title>
      </S.ContentWrapper>

      <S.DiscussionRight>
        <S.WriterImg src={member.imageUrl} />
        <S.CommentWrapper>
          <S.CommentCountIcon />
          <p>{commentCount}</p>
        </S.CommentWrapper>
      </S.DiscussionRight>
    </S.DiscussionItemContainer>
  );
}
