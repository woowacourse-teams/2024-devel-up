import type { UseMutationResult } from '@tanstack/react-query';

interface PostCommentPayload {
  content: string;
  parentCommentId?: number;
}

export interface PostCommentParams {
  postId: number;
  body: PostCommentPayload;
}

export type UsePostCommentMutation<Response = unknown> = (
  onSuccess?: () => void,
  onError?: (error: Error) => void,
) => UseMutationResult<Response, Error, PostCommentParams>;
