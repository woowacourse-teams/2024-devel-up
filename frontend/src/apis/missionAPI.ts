import { BASE_URL } from './baseUrl';
import { develupAPIClient } from './clients/develupClient';
import { PATH } from './paths';
import type { Mission, MissionInProgress, SubmissionPayload, Submission } from '@/types';

interface getMissionInProgressResponse {
  data: MissionInProgress;
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
  try {
    const response = await fetch(`${BASE_URL.dev}${PATH.missionList}/${id}`);

    if (!response.ok) {
      throw new Error('에러가 발생했어요!');
    }

    const jsonData = await response.json();

    const { data } = jsonData;

    return data;
  } catch (err) {
    console.error(err);
    throw new Error('');
  }
};

export const getMissionInProgress = async (): Promise<MissionInProgress> => {
  const { data } = await develupAPIClient.get<getMissionInProgressResponse>(PATH.missionInProgress);

  return data;
};

export interface PostSubmissionResponse {
  data: Submission;
}

export const postSubmission = async (payload: SubmissionPayload) => {
  const data = await develupAPIClient.post<PostSubmissionResponse>(PATH.submissions, payload);

  return data;
};
