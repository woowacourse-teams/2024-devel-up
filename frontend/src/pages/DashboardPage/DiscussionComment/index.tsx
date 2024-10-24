import DiscussionCommentList from '@/components/DashBoard/DiscussionComment';
import SpinnerSuspense from '@/components/common/SpinnerSuspense';

export default function DashboardDiscussionCommentPage() {
  return (
    <SpinnerSuspense>
      <DiscussionCommentList />
    </SpinnerSuspense>
  );
}
