import { develupAPIClient } from '@/apis/clients/develupClient';
import { PATH } from '@/apis/paths';
import type { Solution } from '@/types/solution';

export interface SolutionSummary {
  // solution 리스트에 필요한 필드만 포함한 데이터 (solution 원본 데이터와는 다름)
  id: number;
  thumbnail: string;
  description: string;
  title: string;
}

interface GetSolutionSummariesResponse {
  data: SolutionSummary[];
}

export const getSolutionSummaries = async (): Promise<SolutionSummary[]> => {
  const { data } = await develupAPIClient.get<GetSolutionSummariesResponse>(PATH.solutionSummaries);

  return data;
};

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
