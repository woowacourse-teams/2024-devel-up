import { BASE_URL } from './baseUrl';
import { develupAPIClient } from './clients/develupClient';
import { PATH } from './paths';
import type { Mission, MissionSubmission } from '@/types';

interface getMissionInProgressResponse {
  data: MissionSubmission;
}

interface getMissionCompletedResponse {
  data: MissionSubmission[];
}

interface getMissionByIdResponse {
  data: Mission;
}

export const getAllMissions = async (): Promise<Mission[]> => {
  try {
    const response = await fetch(`${BASE_URL.dev}${PATH.missionList}`);

    if (!response.ok) {
      throw new Error('에러가 발생했어요! ');
    }

    const jsonData = await response.json();

    const { data } = jsonData;

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('');
  }
};

export const getMissionById = async (id: number): Promise<Mission> => {
  const { data } = await develupAPIClient.get<getMissionByIdResponse>(`${PATH.missionList}/${id}`);

  return data;
};

export const getMissionInProgress = async (): Promise<MissionSubmission> => {
  const { data } = await develupAPIClient.get<getMissionInProgressResponse>(
    PATH.submissionsInProgress,
  );

  return data;
};

export const getMissionCompleted = async (): Promise<MissionSubmission[]> => {
  const { data } = await develupAPIClient.get<getMissionCompletedResponse>(PATH.submissions);

  return data;
};
