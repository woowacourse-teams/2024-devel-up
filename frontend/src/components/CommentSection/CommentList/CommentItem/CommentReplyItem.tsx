import * as S from '../CommentList.styled';
import type { CommentReply } from '@/types';
import CommentInfo from './CommentInfo';
import type { UseDeleteCommentMutation, UsePatchCommentMutation } from '../../CommentForm/types';
import DeleteIcon from '@/assets/images/deleteIcon.svg';
import EditIcon from '@/assets/images/editIcon.svg';
import useUserInfo from '@/hooks/useUserInfo';
import { useState } from 'react';
import CommentPatchForm from '../../CommentPatchForm';

interface CommentReplyItemProps {
  commentReply: CommentReply;
  usePatchCommentMutation: UsePatchCommentMutation;
  useDeleteCommentMutation: UseDeleteCommentMutation;
}

export default function CommentReplyItem({
  commentReply,
  usePatchCommentMutation,
  useDeleteCommentMutation,
}: CommentReplyItemProps) {
  const [isEdit, setIsEdit] = useState(false);

  const { id, member, content, createdAt } = commentReply;

  const { data: userInfo } = useUserInfo();

  const isMine = member.id === userInfo?.id;

  const onEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const { mutate: deleteCommentMutation } = useDeleteCommentMutation();
  const onDelete = () => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      deleteCommentMutation({ commentId: id });
    }
  };

  return (
    <S.CommentReplyItemContainer>
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
          initialContent={commentReply.content}
          commentId={commentReply.id}
          usePatchCommentMutation={usePatchCommentMutation}
          onSubmit={() => setIsEdit(false)}
        />
      ) : (
        <S.CommentContent source={content} />
      )}
    </S.CommentReplyItemContainer>
  );
}
