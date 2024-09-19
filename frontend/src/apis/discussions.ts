import type { Discussion } from '@/types/discussion';
import { develupAPIClient } from './clients/develupClient';
import { PATH } from './paths';

interface GetDiscussionResponse {
  data: Discussion;
}

export const getDiscussionById = async (discussionId: number): Promise<Discussion> => {
  const { data } = await develupAPIClient.get<GetDiscussionResponse>(
    `${PATH.discussions}/${discussionId}`,
  );

  return data;
};
