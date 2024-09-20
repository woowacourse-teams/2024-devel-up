import type { Discussion } from '@/types/dashboard';
import NoContent from '../DashBoardMissionList/NoContent';
import * as S from './DashBoardDiscussion.styled';
import DiscussionItem from './DiscussionItem';

interface DashBoardDiscussionListProps {
  discussionList: Discussion[];
}

export default function DashBoardDiscussionList({ discussionList }: DashBoardDiscussionListProps) {
  return (
    <>
      {!discussionList.length ? (
        <NoContent type="dashboardDiscussion" />
      ) : (
        <S.Container>
          {discussionList.map((discussion) => {
            return (
              <DiscussionItem
                key={discussion.id}
                id={discussion.id}
                hashTags={discussion.hashTags}
                title={discussion.title}
                mission={discussion.mission}
                imageUrl={discussion.member.imageUrl}
                commentCount={discussion.commentCount}
              />
            );
          })}
        </S.Container>
      )}
    </>
  );
}
