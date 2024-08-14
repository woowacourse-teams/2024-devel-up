export interface HashTag {
  id: number;
  name: string;
}

export interface MissionInProgress {
  id: number;
  thumbnail: string;
  title: string;
  summary: string;
  hashtag: HashTag[];
}
