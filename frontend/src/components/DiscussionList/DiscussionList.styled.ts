import styled from 'styled-components';
import CommentCount from '@/assets/images/comment-count.svg';

export const DiscussionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const DiscussionItemContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.4rem 3.4rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.boxShadow.shadow04};
  border-radius: 2.8rem;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.01);
  }
`;

export const BadgeWrapper = styled.div`
  display: flex;
  gap: 0.7rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Title = styled.p`
  color: ${(props) => props.theme.colors.black};
  ${(props) => props.theme.font.body}
`;

export const WriterImg = styled.img`
  border-radius: 100%;
  max-width: 4.2rem;
  max-height: 4.2rem;
`;

export const DiscussionRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.7rem;
  width: 10.5rem;

  color: ${(props) => props.theme.colors.grey400};
  ${(props) => props.theme.font.caption};
`;

export const CommentWrapper = styled.div`
  display: flex;
  gap: 0.7rem;
`;

export const CommentCountIcon = styled(CommentCount)`
  width: 1.4rem;
  height: 1.4rem;
`;
