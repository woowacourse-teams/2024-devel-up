import * as S from './DiscussionList.styled';
import DiscussionListItem from './DiscussionListItem';
import { Link } from 'react-router-dom';
import NoContentWithoutButton from '../common/NoContent/NoContentWithoutButton';
import useDiscussions from '@/hooks/useDiscussions';

interface DiscussionListContentProps {
  missionTitle?: string;
  hashtag?: string;
}

export default function DiscussionListContent({
  missionTitle,
  hashtag,
}: DiscussionListContentProps) {
  const { data: discussions } = useDiscussions(missionTitle, hashtag);

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
