import type { Discussion } from '@/types';
import { develupAPIClient } from './clients/develupClient';
import { PATH } from './paths';
import type { DiscussionDetail } from '@/types/discussion';
import { getWithPagination } from './paginationAPI';
import type { PaginationResponse } from './paginationAPI';

interface GetDiscussionsOptions {
  mission: string;
  hashTag: string;
  page: string;
  size: string;
}

export const getDiscussions = async ({
  mission,
  hashTag,
  page = '0',
  size = '9',
}: GetDiscussionsOptions): Promise<PaginationResponse<Discussion[]>> => {
  const { data, currentPage, totalPage } = await getWithPagination<Discussion[]>(PATH.discussions, {
    mission,
    hashTag,
    page,
    size,
  });

  return {
    data: data,
    currentPage: currentPage,
    totalPage: totalPage,
  };
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

export const deleteDiscussion = async (discussionId: number) => {
  await develupAPIClient.delete(`${PATH.discussions}/${discussionId}`);
};
