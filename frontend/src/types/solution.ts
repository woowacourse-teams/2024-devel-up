import type { Mission } from './index';

interface Member {
  id: number;
  email: string;
  provider: string;
  socialId: number;
  name: string;
  imageUrl: string;
}

export interface Solution {
  id: number;
  mission: Mission;
  member: Member;
  title: string;
  description: string;
  url: string;
}
