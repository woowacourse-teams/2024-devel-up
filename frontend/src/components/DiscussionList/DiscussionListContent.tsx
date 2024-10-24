import * as S from './DiscussionList.styled';
import DiscussionListItem from './DiscussionListItem';
import { Link } from 'react-router-dom';
import NoContentWithoutButton from '../common/NoContent/NoContentWithoutButton';
import type { Discussion } from '@/types';

interface DiscussionListContentProps {
  discussions: Discussion[];
}

export default function DiscussionListContent({ discussions }: DiscussionListContentProps) {
  return (
    <S.ContentContainer>
      {discussions.length ? (
        discussions.map((discussion) => (
          <Link key={discussion.id} to={`/discussions/${discussion.id}`}>
            <DiscussionListItem
              title={discussion.title}
              mission={discussion.mission}
              hashTags={discussion.hashTags}
              member={discussion.member}
              commentCount={discussion.commentCount}
            />
          </Link>
        ))
      ) : (
        <NoContentWithoutButton type="discussion" />
      )}
    </S.ContentContainer>
  );
}
