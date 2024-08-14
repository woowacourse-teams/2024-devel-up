import { develupAPIClient } from './clients/develupClient';
import { PATH } from './paths';
import type { Mission, SubmissionPayload, Submission } from '@/types';
import type { MissionInProgress } from '@/types/mission';
import MissionListInProgress from '@/mocks/missionInProgress.json';

interface getMissionByIdResponse {
  data: Mission;
}

interface getAllMissionResponse {
  data: Mission[];
}

export const getAllMissions = async (): Promise<Mission[]> => {
  const { data } = await develupAPIClient.get<getAllMissionResponse>(PATH.missionList);

  return data;
};

export const getMissionById = async (id: number): Promise<Mission> => {
  const { data } = await develupAPIClient.get<getMissionByIdResponse>(`${PATH.missionList}/${id}`);

  return data;
};

interface GetMissionInProgressResponse {
  data: MissionInProgress[];
}

// TODO 실제 API 연결 아직 안했습니다.
export const getMissionInProgress = async () => {
  // const { data } = await develupAPIClient.get<GetMissionInProgressResponse>(PATH.missionInProgress);

  // console.log('data : ', data);

  return MissionListInProgress;
  // return [];
};

export interface PostSubmissionResponse {
  data: Submission;
}

export const postSubmission = async (payload: SubmissionPayload) => {
  const data = await develupAPIClient.post<PostSubmissionResponse>(PATH.submissions, payload);

  return data;
};
