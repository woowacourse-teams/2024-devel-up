import useDashboardDiscussionComment from '@/hooks/useDashboardDiscussionComment';
import DiscussionCommentList from '@/components/DashBoard/DiscussionComment';

export default function DashboardDiscussionCommentPage() {
  const { data: discussionCommentList } = useDashboardDiscussionComment();

  return <DiscussionCommentList discussionCommentList={discussionCommentList} />;
}
