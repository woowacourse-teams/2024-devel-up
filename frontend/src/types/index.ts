import type { ReactNode } from 'react';

export interface TabInfo {
  name: string;
  content: ReactNode;
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

export interface Mission {
  id: number;
  title: string;
  language: string;
  descriptionUrl: string;
  thumbnail: string;
  url: string;
  isStarted?: boolean;
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
