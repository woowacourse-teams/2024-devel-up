import { getHashTags } from '@/apis/missionAPI';
import type { HashTag } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { hashTagsKeys } from './queries/keys';

const useHashTags = () => {
  return useSuspenseQuery<HashTag[]>({
    queryKey: hashTagsKeys.hashTags,
    queryFn: () => getHashTags(),
  });
};

export default useHashTags;
