import styled from 'styled-components';
import CommentCount from '@/assets/images/comment-count.svg';

// Content

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const ItemContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.4rem 3.4rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.boxShadow.shadow04};
  border-radius: 2.8rem;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

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

export const ItemRight = styled.div`
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

// Header
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const HeaderTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderTitle = styled.h1`
  ${(props) => props.theme.font.heading1}
`;

export const HeaderSubtitle = styled.p`
  ${(props) => props.theme.font.body}

  color: ${(props) => props.theme.colors.grey500};
`;
