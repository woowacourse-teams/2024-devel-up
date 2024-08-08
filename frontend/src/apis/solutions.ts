import { develupAPIClient } from './clients/develupClient';
import { PATH } from './paths';
import type { Solution } from '@/types/solution';

export interface PostSolutionResponse {
  data: Solution;
}

export const postSolutionStart = async (payload: { missionId: number }): Promise<Solution> => {
  const { data } = await develupAPIClient.post<PostSolutionResponse>(PATH.startSolution, payload);

  return data;
};

export const postSolutionSubmit = async (payload: {
  missionId: number;
  title: string;
  description: string;
  url: string;
}): Promise<Solution> => {
  const { data } = await develupAPIClient.post<PostSolutionResponse>(PATH.submitSolution, payload);

  return data;
};
