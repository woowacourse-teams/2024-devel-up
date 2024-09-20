import type { PostCommentParams } from '@/components/CommentSection/CommentForm/types';
import type { SolutionComment, MyComments } from '@/types';
import { develupAPIClient } from './clients/develupClient';
import { PATH, PATH_FORMATTER } from './paths';
import type { PostSolutionCommentResponseData } from '@/hooks/usePostSolutionCommentMutation';

export const getSolutionComments = async (solutionId: number): Promise<SolutionComment[]> => {
  const { data } = await develupAPIClient.get<{ data: SolutionComment[] }>(
    PATH_FORMATTER.solutionComments(solutionId),
  );

  return data;
};

export const postSolutionComment = async ({
  postId,
  body,
}: PostCommentParams): Promise<PostSolutionCommentResponseData> => {
  const { data } = await develupAPIClient.post<{ data: PostSolutionCommentResponseData }>(
    PATH_FORMATTER.solutionComments(postId),
    body,
  );

  return data;
};

export const getMyComments = async (): Promise<MyComments[]> => {
  const { data } = await develupAPIClient.get<{ data: MyComments[] }>(PATH.myComments);

  return data;
};
