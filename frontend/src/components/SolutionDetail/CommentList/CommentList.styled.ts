import SanitizedMDPreview from '@/components/common/SanitizedMDPreview';
import styled from 'styled-components';

export const CommentListContainer = styled.div`
  margin-top: 3rem;
`;

export const CommentItemContainer = styled.div<{ $isReply?: boolean }>`
  padding: 1.5rem 0;
  border-bottom: 1px solid ${({ $isReply }) => ($isReply ? 'var(--grey-200)' : '#c6b9ff')};

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const CommentUserInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const UserProfileImg = styled.img`
  width: 4.2rem;
  height: 4.2rem;
  border: 1px solid var(--grey-400);
  border-radius: 10rem;
  object-fit: cover;
  margin-right: 1rem;
`;

export const UserName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--grey-600);
`;

export const DeletedComment = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  color: var(--grey-500);
  font-size: 1.6rem;
`;

export const CommentContent = styled(SanitizedMDPreview)`
  font-size: 1.6rem;
  margin-left: 5.2rem;
`;

export const CommentReplyListContainer = styled.div``;

export const ReplyWriteButton = styled.button`
  color: var(--primary-500);
  font-size: 1.4rem;
  margin: 1.5rem 0;
`;

export const CommentContentWrapper = styled.div`
  margin-left: 5.2rem;
`;

export const CommentReplySectionContainer = styled.section`
  margin-left: 5.2rem;
`;

export const CommentReplyFormWrapper = styled.div``;
