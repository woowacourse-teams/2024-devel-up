import type { Mission } from '.';

interface Member {
  id: number;
  email: string;
  name: string;
  imageUrl: string;
}

export interface Solution {
  id: number;
  title: string;
  description: string;
  url: string;
  member: Member;
  mission: Mission;
}

export interface SubmittedSolution {
  id: number;
  thumbnail: string;
  title: string;
}
