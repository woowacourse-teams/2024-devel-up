import DashBoardDiscussionList from '@/components/DashBoard/DashboardDiscussion';
import SpinnerSuspense from '@/components/common/SpinnerSuspense';

export default function DashboardDiscussionPage() {
  return (
    <SpinnerSuspense>
      <DashBoardDiscussionList />
    </SpinnerSuspense>
  );
}
