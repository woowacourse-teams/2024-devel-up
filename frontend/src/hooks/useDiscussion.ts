import { useQuery } from '@tanstack/react-query';
import { discussionKeys } from './queries/keys';
import type { DiscussionDetail } from '@/types/discussion';
import { getDiscussionById } from '@/apis/discussionAPI';

const useDiscussion = (discussionId?: number) => {
  const { data } = useQuery<DiscussionDetail>({
    queryKey: discussionKeys.detail(discussionId || 0),
    queryFn: discussionId ? () => getDiscussionById(discussionId) : undefined,
    enabled: !!discussionId,
  });

  return {
    data: data ?? {
      id: 0,
      member: { id: 0, email: '', name: '', imageUrl: '', description: '' },
      title: '',
      content: '',
      mission: {
        id: 0,
        title: '',
        language: '',
        descriptionUrl: '',
        thumbnail: '',
        url: '',
        summary: '',
        hashTags: [],
      },
      hashTags: [],
    },
  };
};

export default useDiscussion;
