import useMyComments from '@/hooks/useMyComments';
import MyCommentList from '@/components/DashBoard/MyComments/MyCommentList';
import myComments from '@/mocks/myComments.json';

export default function MyCommentsPage() {
  // const { data: myComments } = useMyComments();

  return <MyCommentList comments={myComments} />;
}
