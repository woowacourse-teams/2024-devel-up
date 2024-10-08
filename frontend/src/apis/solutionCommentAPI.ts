import type {
  DeleteCommentParams,
  PatchCommentParams,
  PostCommentParams,
} from '@/components/CommentSection/CommentForm/types';
import type { SolutionComment, MyComments } from '@/types';
import { develupAPIClient } from './clients/develupClient';
import { PATH, PATH_FORMATTER } from './paths';

export const getSolutionComments = async (solutionId: number): Promise<SolutionComment[]> => {
  const { data } = await develupAPIClient.get<{ data: SolutionComment[] }>(
    PATH_FORMATTER.solutionComments(solutionId),
  );

  return data;
};

export interface PostSolutionCommentResponseData {
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

export interface PatchSolutionCommentResponseData {
  id: number;
  solutionId: number;
  content: string;
  member: {
    id: number;
    email: string;
    name: string;
    imageUrl: string;
  };
  createdAt: string;
}

export const patchSolutionComment = async ({
  commentId,
  body,
}: PatchCommentParams): Promise<PatchSolutionCommentResponseData> => {
  const { data } = await develupAPIClient.patch<{ data: PatchSolutionCommentResponseData }>(
    PATH_FORMATTER.solutionSingleComment(commentId),
    body,
  );

  return data;
};

type CommentId = number;

export const deleteSolutionComment = async ({
  commentId,
}: DeleteCommentParams): Promise<CommentId> => {
  await develupAPIClient.delete(PATH_FORMATTER.solutionSingleComment(commentId));

  return commentId;
};

export const getMyComments = async (): Promise<MyComments[]> => {
  const { data } = await develupAPIClient.get<{ data: MyComments[] }>(PATH.myComments);

  return data;
};
