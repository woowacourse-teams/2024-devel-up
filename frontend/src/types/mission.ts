import type { HashTag } from '.';

export interface MissionInProgress {
  id: number;
  thumbnail: string;
  title: string;
  summary: string;
  hashTag: HashTag[];
}
