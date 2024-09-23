import type { ReactNode } from 'react';
import type { UserInfo } from './user';

export interface TabInfo {
  name: string;
  content: ReactNode;
}

export interface HashTag {
  id: number;
  name: string;
}

//TODO 백엔드에서 내려주는 language 타입이 string이라서 일단 string으로 수정해놓았습니다!
export interface Mission {
  id: number;
  title: string;
  language: string;
  descriptionUrl: string;
  thumbnail: string;
  url: string;
  isStarted?: boolean;
  summary: string;
  hashTags: HashTag[];
}

export interface MissionWithDescription extends Mission {
  description: string;
}

// postSubmission에 관련된 타입 선언
export interface SubmissionPayload {
  missionId: number;
  url: string;
  title: string;
  description: string | null;
}

export interface Submission {
  missionId: number;
  title: string;
  description: string;
  url: string;
}

interface BaseComment {
  id: number;
  content: string;
  member: UserInfo;
  replies: CommentReply[];
  createdAt: string;
  isDeleted: boolean;
}

export interface SolutionComment extends BaseComment {
  solutionId: number;
}

export interface DiscussionComment extends BaseComment {
  discussionId: number;
}

export type Comment = SolutionComment | DiscussionComment;

export interface CommentReply {
  id: number;
  solutionId: number;
  parentCommentId: number;
  content: string;
  member: UserInfo;
  createdAt: string;
}

export interface MyComments {
  id: number;
  solutionId: number;
  content: string;
  createdAt: string;
  solutionTitle: string;
  solutionCommentCount: number;
}

export interface Comments {
  id: number;
  contentId: number;
  content: string;
  createdAt: string;
  contentTitle: string;
  contentCommentCount: number;
}

export interface Discussion {
  id: number;
  title: string;
  mission: string;
  hashTags: HashTag[];
  member: Omit<UserInfo, 'description'>;
  commentCount: number;
}
