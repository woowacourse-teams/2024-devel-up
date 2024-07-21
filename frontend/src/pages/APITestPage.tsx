import { getMissions, postSubmission } from '@/apis/mission';

export default function APITestPage() {
  const testGetMissions = async () => {
    try {
      // ✅ getMissions 로직을 확인해주세요
      const missions = await getMissions();

      alert(`요청 성공! \n응답: ${JSON.stringify(missions)}`);
    } catch (err) {
      alert('요청 실패. console을 확인하세요.');
      console.error(err);
    }
  };

  const testGetMissionsWithQueryParams = async () => {
    try {
      // ✅ getMissions에 쿼리 파라미터를 넘기는 방식을 확인해주세요.
      const missions = await getMissions({ page: '1' });

      alert(`요청 성공! \n응답: ${JSON.stringify(missions)}`);
    } catch (err) {
      alert('요청 실패. console을 확인하세요.');
      console.error(err);
    }
  };

  const testPostMissionSubmission = async () => {
    try {
      // ✅ postSubmission 로직을 확인해주세요
      const createdSubmission = await postSubmission({
        missionId: 999,
        url: 'www.develup.com',
        comment: '테스트용 데이터입니다 (언제든 지워도 됨)',
      });
      alert(`요청 성공! \n응답: ${JSON.stringify(createdSubmission)}`);
    } catch (err) {
      alert('요청 실패. console을 확인하세요.');
      console.error(err);
    }
  };

  return (
    <div>
      <button
        style={{
          background: 'lightblue',
          fontSize: '5rem',
          cursor: 'pointer',
        }}
        onClick={testGetMissions}
      >
        get 요청 test 🤖
      </button>
      <br />
      <button
        style={{
          background: 'lightblue',
          fontSize: '5rem',
          cursor: 'pointer',
        }}
        onClick={testGetMissionsWithQueryParams}
      >
        쿼리파라미터가 담긴 get 요청 test 🤖
      </button>
      <br />
      <button
        style={{
          background: 'pink',
          fontSize: '5rem',
          cursor: 'pointer',
        }}
        onClick={testPostMissionSubmission}
      >
        post 요청 test 🤖
      </button>
    </div>
  );
}
