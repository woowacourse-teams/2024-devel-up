import useMyComments from '@/hooks/useMyComments';
import MyCommentList from '@/components/DashBoard/MyComments/MyCommentList';

export default function MyCommentsPage() {
  const { data: myComments } = useMyComments();

  return <MyCommentList comments={myComments} />;
}
