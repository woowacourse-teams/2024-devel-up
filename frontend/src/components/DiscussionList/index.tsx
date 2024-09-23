import * as S from './DiscussionList.styled';
import DiscussionListItem from './DiscussionListItem';
import { Link } from 'react-router-dom';
import type { Discussion } from '@/types';

interface DiscussionListProps {
  discussions: Discussion[];
}

export default function DiscussionList({ discussions }: DiscussionListProps) {
  return (
    <S.DiscussionListContainer>
      {discussions.map((discussion) => (
        <Link key={discussion.id} to={`/discussions/${discussion.id}`}>
          <DiscussionListItem
            title={discussion.title}
            mission={discussion.mission}
            hashTags={discussion.hashTags}
            member={discussion.member}
            commentCount={discussion.commentCount}
          />
        </Link>
      ))}
    </S.DiscussionListContainer>
  );
}
