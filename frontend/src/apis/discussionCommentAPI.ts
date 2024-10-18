import type {
  DeleteCommentParams,
  PatchCommentParams,
  PostCommentParams,
} from '@/components/CommentSection/CommentForm/types';
import type { DiscussionComment } from '@/types';
import { develupAPIClient } from './clients/develupClient';
import { PATH_FORMATTER } from './paths';

export const getDiscussionComments = async (solutionId: number): Promise<DiscussionComment[]> => {
  const { data } = await develupAPIClient.get<{ data: DiscussionComment[] }>(
    PATH_FORMATTER.discussionComments(solutionId),
  );

  return data;
};

export interface PostDiscussionCommentResponseData {
  id: number;
  discussionId: number;
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

export interface PatchDiscussionCommentResponseData {
  id: number;
  discussionId: number;
  content: string;
  member: {
    id: number;
    email: string;
    name: string;
    imageUrl: string;
  };
  createdAt: string;
}

export const patchDiscountComment = async ({
  commentId,
  body,
}: PatchCommentParams): Promise<PatchDiscussionCommentResponseData> => {
  const { data } = await develupAPIClient.patch<{ data: PatchDiscussionCommentResponseData }>(
    PATH_FORMATTER.discussionSingleComment(commentId),
    body,
  );

  return data;
};

type CommentId = number;

export const deleteDiscussionComment = async ({
  commentId,
}: DeleteCommentParams): Promise<CommentId> => {
  await develupAPIClient.delete(PATH_FORMATTER.discussionSingleComment(commentId));

  return commentId;
};
