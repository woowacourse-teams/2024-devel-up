import * as S from './DiscussionList.styled';
// import useDiscussions from '@/hooks/useDiscussions';
import DiscussionListItem from './DiscussionListItem';
// import { useState } from 'react';
import discussionsMock from './discussionsMock.json';

export default function DiscussionList() {
  // TODO: API 연결 필요 @프룬
  // const [mission, setMission] = useState<string>('all');
  // const [hashTag, setHashTag] = useState<string>('all');

  // const { data: discussions } = useDiscussions(mission, hashTag);
  return (
    <S.DiscussionListContainer>
      {discussionsMock.map((discussion) => (
        <DiscussionListItem
          key={discussion.id}
          title={discussion.title}
          mission={discussion.mission.title}
          hashTags={discussion.hashTags}
          member={discussion.member}
          commentCount={discussion.commentCount}
        />
      ))}
    </S.DiscussionListContainer>
  );
}
