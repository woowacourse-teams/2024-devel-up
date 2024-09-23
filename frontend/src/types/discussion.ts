import type { HashTag, Mission } from '.';
import type { UserInfo } from './user';

export interface DiscussionDetail {
  id: number;
  member: UserInfo;
  title: string;
  content: string;
  mission: Mission;
  hashTags: HashTag[];
}
