import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import media from '@/styles/mediaQueries';

export const HashTagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

export const HashTag = styled.span<{ $isTitle?: boolean }>`
  padding: 0.5rem 0.8rem;
  border-radius: 2rem;
  margin-right: 0.7rem;
  background-color: ${(props) => (props.$isTitle ? 'var(--danger-50)' : 'var(--primary-50)')};

  ${media.medium`
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
    `}
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
  width: 100%;
  height: 100%;

  ${media.medium`
      padding: 0 6rem;
    `}
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
  justify-content: space-between;

  ${media.medium`
  display: flex;
    flex-direction: column;
    height: 100%;
    `}
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

  ${media.medium`
  justify-content: end;
    `}
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50rem;

  ${media.medium`
  width:18rem
    `}
`;

export const CommentText = styled.span`
  ${(props) => props.theme.font.body}
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80%;
`;

export const SubText = styled.span`
  ${(props) => props.theme.font.badge}
  color : var(--grey-400);
  margin-bottom: 0.5rem;
`;

export const CommentCountText = styled(SubText)`
  margin-left: 0.7rem;
`;
