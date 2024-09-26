import type { UserInfo } from './user';
import type { HashTag } from './index';

export interface Discussion {
  id: number;
  title: string;
  mission: string;
  member: Omit<UserInfo, 'description'>;
  hashTags: HashTag[];
  commentCount: number;
  createdAt: string;
}

export interface DashboardDiscussion {
  data: Discussion[];
}

export interface DiscussionComment {
  id: number;
  discussionId: number;
  content: string;
  createdAt: string;
  discussionTitle: string;
  discussionCommentCount: number;
}

export interface DashboardDiscussionComment {
  data: DiscussionComment[];
}
