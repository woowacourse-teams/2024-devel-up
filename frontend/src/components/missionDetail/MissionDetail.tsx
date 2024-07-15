import { useParams } from 'react-router-dom';

export default function MissionDetail() {
  const { id } = useParams();

  return <div>{id}</div>;
}
