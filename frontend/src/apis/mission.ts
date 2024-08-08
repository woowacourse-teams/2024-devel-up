import type { Mission } from '@/types';
import { develupAPIClient } from './clients/develupClient';
import { PATH } from './paths';

// 이 파일 내의 타입 선언 및 api 요청 로직은 APIClient 사용법을 설명하기 위한 예시 코드입니다. @라이언
interface Submission {
  id: number;
  memberId: number;
  missionId: number;
  url: string;
  comment: string;
}

interface GetMissionsResponse {
  data: Mission[];
}

interface PostSubmissionResponse {
  data: Submission;
}

export const getMissions = async (queryParams?: Record<string, string>): Promise<Mission[]> => {
  const { data } = await develupAPIClient.get<GetMissionsResponse>(PATH.missionList, queryParams);

  return data;
};

export const postSubmission = async (payload: {
  missionId: number;
  url: string;
  comment: string;
}): Promise<Submission> => {
  const { data } = await develupAPIClient.post<PostSubmissionResponse>(PATH.submissions, payload);

  return data;
};

export const postMissionStart = async (payload: { missionId: number }): Promise<any> => {
  return await develupAPIClient.post(PATH.startSolution, payload);
};
