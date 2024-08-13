import { develupAPIClient } from './clients/develupClient';
import { PATH } from './paths';
import type { Mission, SubmissionPayload, Submission } from '@/types';

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

export interface PostSubmissionResponse {
  data: Submission;
}

export const postSubmission = async (payload: SubmissionPayload) => {
  const data = await develupAPIClient.post<PostSubmissionResponse>(PATH.submissions, payload);

  return data;
};
