import { develupAPIClient } from './clients/develupClient';
import { PATH } from './paths';
import type {
  Mission,
  MissionWithDescription,
  SubmissionPayload,
  Submission,
  HashTag,
} from '@/types';
import MissionListInProgress from '@/mocks/missionInProgress.json';
import { populateMissionDescription } from './utils/populateMissionDescription';
import { HASHTAGS } from '@/constants/hashTags';

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

// interface GetMissionInProgressResponse {
//   data: MissionInProgress[];
// }

// TODO 실제 API 연결 아직 안했습니다.
export const getMissionInProgress = async () => {
  // const { data } = await develupAPIClient.get<GetMissionInProgressResponse>(PATH.missionInProgress);

  // console.log('data : ', data);

  return MissionListInProgress;
  // return [];
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
