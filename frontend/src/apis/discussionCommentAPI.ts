import type { PostCommentParams } from '@/components/CommentSection/CommentForm/types';
import type { DiscussionComment } from '@/types';
import { develupAPIClient } from './clients/develupClient';
import { PATH_FORMATTER } from './paths';
import type { PostDiscussionCommentResponseData } from '@/hooks/usePostDiscussionCommentMutation';

export const getDiscussionComments = async (solutionId: number): Promise<DiscussionComment[]> => {
  const { data } = await develupAPIClient.get<{ data: DiscussionComment[] }>(
    PATH_FORMATTER.discussionComments(solutionId),
  );

  return data;
};

export const postDiscussionComment = async ({
  postId,
  body,
}: PostCommentParams): Promise<PostDiscussionCommentResponseData> => {
  const { data } = await develupAPIClient.post<{ data: PostDiscussionCommentResponseData }>(
    PATH_FORMATTER.discussionComments(postId),
    body,
  );

  return data;
};
