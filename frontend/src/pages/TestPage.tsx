import APIClient from '@/apis/APIClient';
import { PATH } from '@/apis/paths';

export default function TestPage() {
  const handleClickButton = async () => {
    try {
      const client = new APIClient('http://localhost:8080');
      const data = await client.get(PATH.missionList);
      console.dir(data);
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={handleClickButton}>test</button>;
}
