import type { ReactNode } from 'react';

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
