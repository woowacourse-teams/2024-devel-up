import styled from 'styled-components';

export const CommentListContainer = styled.div`
  margin-top: 3rem;
`;

export const CommentItemContainer = styled.div`
  padding: 1.5rem 0;
  border-bottom: 1px solid #c6b9ff;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const UserInfoWrapper = styled.div`
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

export const CommentContent = styled.div`
  margin-left: 5.2rem;
  font-size: 1.6rem;
`;

export const CommentReplyListContainer = styled.div`
  padding-left: 5.2rem;
  margin-top: 2rem;
`;
