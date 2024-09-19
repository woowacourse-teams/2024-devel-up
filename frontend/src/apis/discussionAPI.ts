import type { Discussion } from '@/types';
import { develupAPIClient } from './clients/develupClient';
import { PATH } from './paths';

export const getDiscussions = async (mission = 'all', hashTag = 'all'): Promise<Discussion[]> => {
  const { data } = await develupAPIClient.get<{ data: Discussion[] }>(`${PATH.discussions}`, {
    mission,
    hashTag,
  });

  return data;
};
