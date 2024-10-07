import type { Discussion } from '@/types';
import { develupAPIClient } from './clients/develupClient';
import { PATH } from './paths';
import type { DiscussionDetail } from '@/types/discussion';

export const getDiscussions = async (mission = 'all', hashTag = 'all'): Promise<Discussion[]> => {
  const { data } = await develupAPIClient.get<{ data: Discussion[] }>(PATH.discussions, {
    mission,
    hashTag,
  });

  return data;
};

interface GetDiscussionResponse {
  data: DiscussionDetail;
}

export const getDiscussionById = async (discussionId: number): Promise<DiscussionDetail> => {
  const { data } = await develupAPIClient.get<GetDiscussionResponse>(
    `${PATH.discussions}/${discussionId}`,
  );

  return data;
};

export const postDiscussionSubmit = async (payload: {
  title: string;
  content: string;
  missionId?: number;
  hashTagIds: number[];
}): Promise<Discussion> => {
  const { data } = await develupAPIClient.post<{ data: Discussion }>(
    PATH.submitDiscussion,
    payload,
  );

  return data;
};

export const patchDiscussion = async (payload: {
  discussionId: number;
  title: string;
  content: string;
  missionId?: number;
  hashTagIds: number[];
}) => {
  const { data } = await develupAPIClient.patch<{ data: Discussion }>(PATH.discussions, payload);

  return data;
};
