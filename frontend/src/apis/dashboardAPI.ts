import { PATH } from './paths';
import { getWithPagination } from './paginationAPI';
import type { PaginationResponse } from './paginationAPI';
import type { UserInfo } from '@/types/user';
import type { HashTag } from '@/types';

interface GetDashboardDiscussionOptions {
  page: string;
}

export interface Discussion {
  id: number;
  title: string;
  mission: string;
  member: Omit<UserInfo, 'description'>;
  hashTags: HashTag[];
  commentCount: number;
  createdAt: string;
}

export const getDashboardDiscussion = async ({
  page,
}: GetDashboardDiscussionOptions): Promise<PaginationResponse<Discussion[]>> => {
  const { data, currentPage, totalPage } = await getWithPagination<Discussion[]>(
    PATH.dashboardDiscussion,
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

interface GetDashboardDiscussionCommentsOptions {
  page: string;
}

export interface DiscussionComment {
  id: number;
  discussionId: number;
  content: string;
  createdAt: string;
  discussionTitle: string;
  discussionCommentCount: number;
}

export const getDashboardDiscussionComments = async ({
  page,
}: GetDashboardDiscussionCommentsOptions): Promise<PaginationResponse<DiscussionComment[]>> => {
  const { data, currentPage, totalPage } = await getWithPagination<DiscussionComment[]>(
    PATH.dashboardDiscussionComment,
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
