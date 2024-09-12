import type { UserInfo } from './user';
import type { Mission, HashTag } from './index';

export interface Discussion {
  id: number;
  title: string;
  content: string;
  mission: Omit<Mission, 'hashTags, isStarted, descriptionUrl'>;
  member: Omit<UserInfo, 'description'>;
  hashTags: HashTag[];
  commentCount: number;
}

export interface DashboardDiscussion {
  data: Discussion[];
}

export interface DiscussionComment {
  id: number;
  commentId: number;
  content: string;
  createdAt: string;
  discussionTitle: string;
  discussionCommentCount: number;
}

export interface DashboardDiscussionComment {
  data: DiscussionComment[];
}
