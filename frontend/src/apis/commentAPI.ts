import type { Comment, MyComments } from '@/types';
import { develupAPIClient } from './clients/develupClient';
import { PATH, PATH_FORMATTER } from './paths';

export const getComments = async (solutionId: number): Promise<Comment[]> => {
  const { data } = await develupAPIClient.get<{ data: Comment[] }>(
    PATH_FORMATTER.comments(solutionId),
  );

  return data;
};

interface PostCommentPayload {
  content: string;
  parentCommentId?: number;
}

export interface PostCommentParams {
  solutionId: number;
  body: PostCommentPayload;
}

export interface PostCommentResponseData {
  id: number;
  solutionId: number;
  parentCommentId: number;
  content: string;
  member: {
    id: number;
    email: string;
    name: string;
    imageUrl: string;
  };
  createdAt: string;
}

export const postComment = async ({
  solutionId,
  body,
}: PostCommentParams): Promise<PostCommentResponseData> => {
  const { data } = await develupAPIClient.post<{ data: PostCommentResponseData }>(
    PATH_FORMATTER.comments(solutionId),
    body,
  );

  return data;
};

export const getMyComments = async (): Promise<MyComments[]> => {
  const { data } = await develupAPIClient.get<{ data: MyComments[] }>(PATH.myComments);

  return data;
};
