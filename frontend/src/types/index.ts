//TODO 임시로 유저 정보에 대한 타입을 정의합니다.
// 추후에 깃허브 로그인 기능과 연동했을때 수정 됩니다 @버건디

import type { ReactNode } from 'react';
import type { UserInfo } from './user';

export interface TabInfo {
  name: string;
  content: ReactNode;
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
}

export interface MissionWithDescription extends Mission {
  description: string;
}

export interface MissionSubmission {
  id: number;
  mission: Mission;
  myPrLink: string;
  pairPrLink: string;
  status: string;
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

export interface Comment {
  id: number;
  solutionId: number;
  content: string;
  member: UserInfo;
  replies: CommentReply[];
  createdAt: string;
  isDeleted: boolean;
}

export interface CommentReply {
  id: number;
  solutionId: number;
  parentCommentId: number;
  content: string;
  member: UserInfo;
  createdAt: string;
}
