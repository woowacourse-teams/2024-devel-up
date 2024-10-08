import type { Comment } from '@/types';
import * as S from '../CommentList.styled';
import useUserInfo from '@/hooks/useUserInfo';
import CommentInfo from './CommentInfo';
import CommentReplySection from './CommentReplySection';
import type {
  UseDeleteCommentMutation,
  UsePatchCommentMutation,
  UsePostCommentMutation,
} from '../../CommentForm/types';
import DeleteIcon from '@/assets/images/deleteIcon.svg';
import EditIcon from '@/assets/images/editIcon.svg';
import { useState } from 'react';
import CommentPatchForm from '../../CommentPatchForm';

interface CommentItemProps {
  comment: Comment;
  usePostCommentMutation: UsePostCommentMutation;
  usePatchCommentMutation: UsePatchCommentMutation;
  useDeleteCommentMutation: UseDeleteCommentMutation;
}

export default function CommentItem({
  comment,
  usePostCommentMutation,
  usePatchCommentMutation,
  useDeleteCommentMutation,
}: CommentItemProps) {
  const [isEdit, setIsEdit] = useState(false);

  const { mutate: deleteCommentMutation } = useDeleteCommentMutation();

  const { id, content, member, createdAt, isDeleted } = comment;

  const { data: userInfo } = useUserInfo();

  const isMine = member.id === userInfo?.id;

  const onEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const onDelete = () => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      deleteCommentMutation({ commentId: id });
    }
  };

  return (
    <S.CommentItemContainer>
      <S.CommentContentWrapper>
        {isDeleted ? (
          <S.DeletedComment>삭제된 댓글입니다.</S.DeletedComment>
        ) : (
          <>
            <S.CommentHead>
              <CommentInfo member={member} createdAt={createdAt} />
              {isMine && (
                <S.ButtonWrapper>
                  <S.Button>
                    <EditIcon onClick={onEdit} />
                  </S.Button>
                  <S.Button onClick={onDelete}>
                    <DeleteIcon />
                  </S.Button>
                </S.ButtonWrapper>
              )}
            </S.CommentHead>
            {isMine && isEdit ? (
              <CommentPatchForm
                initialContent={comment.content}
                commentId={comment.id}
                usePatchCommentMutation={usePatchCommentMutation}
                onSubmit={() => setIsEdit(false)}
              />
            ) : (
              <S.CommentContent source={content} />
            )}
          </>
        )}
      </S.CommentContentWrapper>
      <CommentReplySection
        parentComment={comment}
        isLoggedIn={Boolean(userInfo)}
        usePostCommentMutation={usePostCommentMutation}
        usePatchCommentMutation={usePatchCommentMutation}
        useDeleteCommentMutation={useDeleteCommentMutation}
      />
    </S.CommentItemContainer>
  );
}
