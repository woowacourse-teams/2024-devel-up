import APIClient from '@/apis/clients/APIClient';
import { PATH } from '@/apis/paths';

export default function TestPage() {
  const requestGet = async () => {
    try {
      const apiClient = new APIClient('http://localhost:8080');
      const data = await apiClient.get(PATH.missionList, { page: '1' });
      console.dir(data);
    } catch (err) {
      console.error(err);
    }
  };

  const requestPost = async () => {
    try {
      const apiClient = new APIClient('http://localhost:8080');
      const data = await apiClient.post(PATH.missionList);
      console.dir(data);
    } catch (err) {
      console.error(err);
    }
  };

  const requestPatch = async () => {
    try {
      const apiClient = new APIClient('http://localhost:8080');
      const data = await apiClient.patch(PATH.missionList, { page: '1' });
      console.dir(data);
    } catch (err) {
      console.error(err);
    }
  };

  const requestDelete = async () => {
    try {
      const apiClient = new APIClient('http://localhost:8080');
      const data = await apiClient.delete(PATH.missionList);
      console.dir(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={requestGet}>get test</button>;
      <button onClick={requestPost}>post test</button>;
      <button onClick={requestPatch}>patch test</button>;
      <button onClick={requestDelete}>delete test</button>;
    </div>
  );
}
