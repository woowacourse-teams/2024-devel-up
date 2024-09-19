import { develupAPIClient } from './clients/develupClient';
import type { DashboardDiscussion, DashboardDiscussionComment } from '@/types/dashboard';
import { PATH } from './paths';

export const getDashboardDiscussion = async () => {
  const { data } = await develupAPIClient.get<DashboardDiscussion>(PATH.dashboardDiscussion);

  console.log('data : ', data);

  return data;
};

export const getDashboardDiscussionComments = async () => {
  const { data } = await develupAPIClient.get<DashboardDiscussionComment>(
    PATH.dashboardDiscussionComment,
  );

  return data;
};
