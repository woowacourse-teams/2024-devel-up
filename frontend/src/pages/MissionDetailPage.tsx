import { useParams } from 'react-router-dom';

export default function MissionDetailPage() {
  const { id } = useParams();

  return <div>{id}</div>;
}
