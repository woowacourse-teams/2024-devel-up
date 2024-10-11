import type { HashTag } from '.';

export interface MissionInProgress {
  id: number;
  title: string;
  thumbnail: string;
  summary: string;
  url: string;
  hashTags: HashTag[];
}

export interface SelectedMissionType {
  id: number;
  title: string;
}
