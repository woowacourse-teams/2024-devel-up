// import { getHashTags } from '@/apis/missionAPI';
// import type { HashTag } from '@/types';
// import { useSuspenseQuery } from '@tanstack/react-query';
import mockHashTags from '@/mocks/hashTag.json';

const useHashTags = () => {
  // TODO: API 배포 시 수정 필요 @프룬
  // return useSuspenseQuery<HashTag[]>({
  //   queryKey: ['hashTags'],
  //   queryFn: () => getHashTags(),
  // });
  return { data: mockHashTags };
};

export default useHashTags;
