import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const HashTagWrapper = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

export const HashTag = styled.span<{ $isTitle?: boolean }>`
  padding: 0.5rem 0.8rem;
  border-radius: 2rem;
  margin-right: 0.7rem;
  background-color: ${(props) => (props.$isTitle ? 'var(--danger-50)' : 'var(--primary-50)')};
`;

export const ImageWrapper = styled.div`
  width: 4.2rem;
  height: 4.2rem;
  border: 0.1rem solid var(--grey-400);
  border-radius: 50%;
`;

export const Image = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  width: 67.4rem;
  height: 100%;

  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const DiscussionWrapper = styled(Link)`
  height: 9.7rem;
  border-radius: 2.8rem;
  background: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.boxShadow.shadow04};
  padding: 14px 34px 14px 34px;
  display: flex;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  cursor: pointer;

  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: 15rem;
  }
`;

export const CommentCountWrapper = styled.div`
  margin-left: 2.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageCommentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
    justify-content: end;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 50rem;
`;

export const CommentText = styled.span`
  ${(props) => props.theme.font.body}
  margin-bottom: 0.6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SubText = styled.span`
  ${(props) => props.theme.font.badge}
  color : var(--grey-400)
`;

export const CommentCountText = styled(SubText)`
  margin-left: 0.7rem;
`;
