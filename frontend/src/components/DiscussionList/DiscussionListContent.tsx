import * as S from './DiscussionList.styled';
import DiscussionListItem from './DiscussionListItem';
import { Link } from 'react-router-dom';
import NoContentWithoutButton from '../common/NoContent/NoContentWithoutButton';
import useDiscussions from '@/hooks/useDiscussions';
import { HASHTAGS } from '@/constants/hashTags';

interface DiscussionListContentProps {
  selectedMission?: string;
  selectedHashTag?: string;
  page: number;
  onPageInfoUpdate?: (totalPage: number) => void;
}

export default function DiscussionListContent({
  selectedMission,
  selectedHashTag,
  page,
  onPageInfoUpdate,
}: DiscussionListContentProps) {
  const { discussions } = useDiscussions({
    mission: selectedMission ?? HASHTAGS.all,
    hashTag: selectedHashTag ?? HASHTAGS.all,
    page,
    onPageInfoUpdate,
  });

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
