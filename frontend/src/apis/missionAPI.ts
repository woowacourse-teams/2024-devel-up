import { develupAPIClient } from './clients/develupClient';
import { PATH } from './paths';
import type { Mission, MissionWithDescription, SubmissionPayload, Submission } from '@/types';
import { populateMissionDescription } from './utils/populateMissionDescription';

interface getMissionByIdResponse {
  data: MissionWithDescription;
}

interface getAllMissionResponse {
  data: Mission[];
}

export const getAllMissions = async (): Promise<Mission[]> => {
  const { data } = await develupAPIClient.get<getAllMissionResponse>(PATH.missionList);

  return data;
};

export const getMissionById = async (id: number): Promise<MissionWithDescription> => {
  const { data } = await develupAPIClient.get<getMissionByIdResponse>(`${PATH.missionList}/${id}`);
  const mission = await populateMissionDescription(data);

  return mission;
};

export interface PostSubmissionResponse {
  data: Submission;
}

export const postSubmission = async (payload: SubmissionPayload) => {
  const data = await develupAPIClient.post<PostSubmissionResponse>(PATH.submissions, payload);

  return data;
};
