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

interface getMissionByIdResponse {
  data: MissionWithDescription;
}

interface getAllMissionResponse {
  data: Mission[];
}

interface getHashTagsResponse {
  data: HashTag[];
}

export const getMissions = async (filter: string = HASHTAGS.all): Promise<Mission[]> => {
  const { data } = await develupAPIClient.get<getAllMissionResponse>(`${PATH.missionList}`, {
    hashTag: filter,
  });

  return data;
};

export const getMissionById = async (id: number): Promise<MissionWithDescription> => {
  const { data } = await develupAPIClient.get<getMissionByIdResponse>(`${PATH.missionList}/${id}`);
  const mission = await populateMissionDescription(data);

  return mission;
};

interface GetMissionInProgressResponse {
  data: MissionInProgress[];
}

export const getMissionInProgress = async () => {
  const { data } = await develupAPIClient.get<GetMissionInProgressResponse>(PATH.missionInProgress);

  return data;
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
