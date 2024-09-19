import type { HashTag, Mission } from '.';
import type { UserInfo } from './user';

export interface Discussion {
  id: number;
  member: UserInfo;
  title: string;
  content: string;
  mission: Mission;
  hashTags: HashTag[];
}
