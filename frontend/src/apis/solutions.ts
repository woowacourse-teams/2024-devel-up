import { develupAPIClient } from '@/apis/clients/develupClient';
import { PATH } from '@/apis/paths';
import { HASHTAGS } from '@/constants/hashTags';
import type { HashTag } from '@/types';
import type { Solution, SubmittedSolution } from '@/types/solution';

export interface SolutionSummary {
  // solution 리스트에 필요한 필드만 포함한 데이터 (solution 원본 데이터와는 다름)
  id: number;
  thumbnail: string;
  description: string;
  title: string;
  hashTags: HashTag[];
}

interface GetSolutionSummariesResponse {
  data: SolutionSummary[];
}

export const getSolutionSummaries = async (payload: {
  mission: string;
  hashTag: string;
}): Promise<SolutionSummary[]> => {
  const { data } = await develupAPIClient.get<GetSolutionSummariesResponse>(
    PATH.solutionSummaries,
    payload,
  );

  return data;
};

interface GetSolutionResponse {
  data: Solution;
}

export const getSolutionById = async (solutionId: number): Promise<Solution> => {
  const { data } = await develupAPIClient.get<GetSolutionResponse>(
    `${PATH.solutions}/${solutionId}`,
  );

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
  description: string | null;
  url: string;
}): Promise<Solution> => {
  const { data } = await develupAPIClient.post<PostSolutionResponse>(PATH.submitSolution, payload);

  return data;
};

export interface GetSubmittedSolution {
  data: SubmittedSolution[];
}

export const getSubmittedSolution = async (): Promise<SubmittedSolution[]> => {
  const { data } = await develupAPIClient.get<GetSubmittedSolution>(PATH.mySolutions);

  return data;
};

export const deleteSolution = async (solutionId: number) => {
  await develupAPIClient.delete(`${PATH.solutions}/${solutionId}`);
};

export interface PatchSolutionResponse {
  data: Solution;
}

export const patchSolution = async (payload: {
  solutionId: number;
  title: string;
  description: string;
  url: string;
}) => {
  await develupAPIClient.patch(`${PATH.solutions}`, payload);
};
