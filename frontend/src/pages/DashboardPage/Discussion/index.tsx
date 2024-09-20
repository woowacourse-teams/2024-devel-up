import useDashboardDiscussion from '@/hooks/useDashboardDiscussion';
import DashBoardDiscussionList from '@/components/DashBoard/DashboardDiscussion';

export default function DashboardDiscussionPage() {
  const { data: discussionList } = useDashboardDiscussion();

  return <DashBoardDiscussionList discussionList={discussionList} />;
}
