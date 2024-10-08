import type { UseMutationResult } from '@tanstack/react-query';

export type UsePostCommentMutation<Response = unknown> = (
  onSuccess?: () => void,
  onError?: (error: Error) => void,
) => UseMutationResult<Response, Error, PostCommentParams>;

export interface PostCommentParams {
  postId: number;
  body: PostCommentPayload;
}

interface PostCommentPayload {
  content: string;
  parentCommentId?: number;
}

export type UsePatchCommentMutation<Response = unknown> = (
  onSuccess?: () => void,
  onError?: (error: Error) => void,
) => UseMutationResult<Response, Error, PatchCommentParams>;

export interface PatchCommentParams {
  commentId: number;
  body: PatchCommentPayload;
}

interface PatchCommentPayload {
  content: string;
}

export interface DeleteCommentParams {
  commentId: number;
}

export type UseDeleteCommentMutation<Response = unknown> = (
  onSuccess?: () => void,
  onError?: (error: Error) => void,
) => UseMutationResult<Response, Error, DeleteCommentParams>;
