//TODO 임시로 유저 정보에 대한 타입을 정의합니다.
// 추후에 깃허브 로그인 기능과 연동했을때 수정 됩니다 @버건디

import type { ReactNode } from 'react';

export interface UserInfo {
  id: number;
  login: string;
  avatar_url: string;
  email: string;
  name: string;
  description?: string;
}

export interface TabInfo {
  name: string;
  content: ReactNode;
}

//TODO 백엔드에서 내려주는 language 타입이 string이라서 일단 string으로 수정해놓았습니다!
export interface Mission {
  id: number;
  title: string;
  language: string;
  description: string;
  thumbnail: string;
  url: string;
}

export interface MissionInProgress {
  id: number;
  mission: Mission;
  myPrLink: string;
  pairPrLink: string;
  status: string;
}
