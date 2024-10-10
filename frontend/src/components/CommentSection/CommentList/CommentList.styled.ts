import SanitizedMDPreview from '@/components/common/SanitizedMDPreview';
import styled from 'styled-components';

export const CommentListContainer = styled.div`
  margin: 3rem 0;
`;

export const CommentItemContainer = styled.div`
  padding: 1.5rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey50};

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const CommentReplyItemContainer = styled.div`
  padding: 3.2rem 0;
  padding: 1.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey50};

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const CommentInfoContainer = styled.div`
  display: flex;
`;

export const UserProfileImg = styled.img`
  width: 4.2rem;
  height: 4.2rem;
  border: 1px solid ${({ theme }) => theme.colors.grey400};
  border-radius: 10rem;
  object-fit: cover;
`;

export const UserName = styled.div`
  color: ${({ theme }) => theme.colors.grey600};
  margin-left: 1.8rem;
  ${({ theme }) => theme.font.body}
`;

export const DeletedComment = styled.div`
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.colors.grey500};
  ${({ theme }) => theme.font.body}
`;

export const CommentCreatedAt = styled.div`
  color: ${({ theme }) => theme.colors.grey500};
  margin-top: 0.2rem;
  margin-left: 1rem;
  ${({ theme }) => theme.font.caption};
`;

export const CommentContent = styled(SanitizedMDPreview)`
  ${({ theme }) => theme.font.body}
  margin-top: -0.8rem;
  margin-left: 6.2rem;
`;

export const CommentReplyListContainer = styled.div``;

export const ReplyWriteButton = styled.button`
  color: ${({ theme }) => theme.colors.primary500};
  margin-bottom: 1.5rem;
  ${({ theme }) => theme.font.button};
`;

export const CommentContentWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

export const CommentReplySectionContainer = styled.section`
  margin-left: 6.2rem;
`;

export const CommentReplyFormWrapper = styled.div`
  margin-top: 2.5rem;
`;

export const CommentHead = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CommentPatchFormWrapper = styled.div`
  margin-top: 1.5rem;
`;

export const Button = styled.button`
  height: fit-content;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
`;
