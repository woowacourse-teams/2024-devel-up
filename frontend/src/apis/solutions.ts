import { develupAPIClient } from '@/apis/clients/develupClient';
import { PATH } from '@/apis/paths';
import type { HashTag } from '@/types';
import type { Solution, SubmittedSolution } from '@/types/solution';
import { getWithPagination } from './paginationAPI';
import type { PaginationResponse } from './paginationAPI';

export interface SolutionSummary {
  // solution 리스트에 필요한 필드만 포함한 데이터 (solution 원본 데이터와는 다름)
  id: number;
  thumbnail: string;
  description: string;
  title: string;
  hashTags: HashTag[];
}

interface GetSolutionSummariesOptions {
  mission: string;
  hashTag: string;
  page: string;
  size: string;
}

export const getSolutionSummaries = async ({
  mission,
  hashTag,
  page = '0',
  size = '9',
}: GetSolutionSummariesOptions): Promise<PaginationResponse<SolutionSummary[]>> => {
  const { data, currentPage, totalPage } = await getWithPagination<SolutionSummary[]>(
    PATH.solutionSummaries,
    {
      mission,
      hashTag,
      page,
      size,
    },
  );

  return {
    data: data,
    currentPage: currentPage,
    totalPage: totalPage,
  };
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

interface GetSubmittedSolutionOptions {
  page: string;
}

export const getSubmittedSolution = async ({
  page,
}: GetSubmittedSolutionOptions): Promise<PaginationResponse<SubmittedSolution[]>> => {
  const { data, currentPage, totalPage } = await getWithPagination<SubmittedSolution[]>(
    PATH.mySolutions,
    {
      size: '9',
      page,
    },
  );

  return {
    data: data,
    currentPage: currentPage,
    totalPage: totalPage,
  };
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
