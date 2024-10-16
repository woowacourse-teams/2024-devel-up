import { develupAPIClient } from './clients/develupClient';
import { PATH } from './paths';
import type {
  Mission,
  MissionWithDescription,
  SubmissionPayload,
  Submission,
  HashTag,
} from '@/types';
import { populateMissionDescription } from './utils/populateMissionDescription';
import { HASHTAGS } from '@/constants/hashTags';
import type { MissionInProgress } from '@/types/mission';
import { getWithPagination } from './paginationAPI';
import type { PaginationResponse } from './paginationAPI';

interface getMissionByIdResponse {
  data: MissionWithDescription;
}

interface getHashTagsResponse {
  data: HashTag[];
}

interface GetMissionsOptions {
  hashTag: string;
  page: string;
  size: string;
}

export const getMissions = async ({
  hashTag = HASHTAGS.all,
  page = '0',
  size = '9',
}: GetMissionsOptions): Promise<PaginationResponse<Mission[]>> => {
  const { data, currentPage, totalPage } = await getWithPagination<Mission[]>(PATH.missionList, {
    size,
    page,
    hashTag,
  });

  return {
    data: data,
    currentPage: currentPage,
    totalPage: totalPage,
  };
};

export const getMissionById = async (id: number): Promise<MissionWithDescription> => {
  const { data } = await develupAPIClient.get<getMissionByIdResponse>(`${PATH.missionList}/${id}`);
  const mission = await populateMissionDescription(data);

  return mission;
};

interface GetMissionInProgressOptions {
  page: string;
}

export const getMissionInProgress = async ({
  page,
}: GetMissionInProgressOptions): Promise<PaginationResponse<MissionInProgress[]>> => {
  const { data, currentPage, totalPage } = await getWithPagination<MissionInProgress[]>(
    PATH.missionInProgress,
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

export interface PostSubmissionResponse {
  data: Submission;
}

export const postSubmission = async (payload: SubmissionPayload) => {
  const data = await develupAPIClient.post<PostSubmissionResponse>(PATH.submissions, payload);

  return data;
};

export const getHashTags = async (): Promise<HashTag[]> => {
  const { data } = await develupAPIClient.get<getHashTagsResponse>(PATH.hashTags);

  return data;
};
