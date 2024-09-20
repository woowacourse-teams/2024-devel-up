import * as S from './DiscussionList.styled';
import useDiscussions from '@/hooks/useDiscussions';
import DiscussionListItem from './DiscussionListItem';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DiscussionList() {
  const [mission] = useState<string>('all');
  const [hashTag] = useState<string>('all');

  const { data: discussions } = useDiscussions(mission, hashTag);
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
