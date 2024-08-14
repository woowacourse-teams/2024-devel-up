import { develupAPIClient } from './clients/develupClient';
import { PATH } from './paths';
import type { Mission, SubmissionPayload, Submission } from '@/types';
import type { MissionInProgress } from '@/types/mission';
import MissionListInProgress from '@/mocks/missionInProgress.json';

interface getMissionByIdResponse {
  data: Mission;
}

interface getAllMissionResponse {
  data: Mission[];
}

export const getAllMissions = async (): Promise<Mission[]> => {
  const { data } = await develupAPIClient.get<getAllMissionResponse>(PATH.missionList);

  return data;
};

export const getMissionById = async (id: number): Promise<Mission> => {
  const { data } = await develupAPIClient.get<getMissionByIdResponse>(`${PATH.missionList}/${id}`);

  return data;
};

interface GetMissionInProgressResponse {
  data: MissionInProgress[];
}

export const getMissionInProgress = async () => {
  // const { data } = await develupAPIClient.get<GetMissionInProgressResponse>(PATH.missionInProgress);

  // console.log('data : ', data);

  return MissionListInProgress;
};

// export const getMissionInProgress = async (): Promise<MissionSubmission> => {
//   const { data } = await develupAPIClient.get<getMissionInProgressResponse>(
//     PATH.submissionsInProgress,
//   );

//   return data;
// };

// export const getMissionCompleted = async (): Promise<MissionSubmission[]> => {
//   const { data } = await develupAPIClient.get<getMissionCompletedResponse>(PATH.submissions);

//   return data;
// };

// getMissionInProgressResponse 타입 네이밍 변경 예정입니다 @프룬
// 해당 타입이 미션 현황 페이지에서 쓰이는 api 반환값으로 많이 쓰이고 있음
// export const postCompleteReview = async (submissionId: number): Promise<MissionSubmission> => {
//   const { data } = await develupAPIClient.post<getMissionInProgressResponse>(
//     `${PATH.pairReview}/${submissionId}`,
//   );

//   return data;
// };

export interface PostSubmissionResponse {
  data: Submission;
}

export const postSubmission = async (payload: SubmissionPayload) => {
  const data = await develupAPIClient.post<PostSubmissionResponse>(PATH.submissions, payload);

  return data;
};
