import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 67.4rem;
  height: 100%;
`;

export const CommentWrapper = styled(Link)`
  height: 8.5rem;
  border-radius: 2.8rem;
  background: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.boxShadow.shadow04};
  padding: 14px 34px 14px 34px;
  display: flex;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
`;

export const CommentCountWrapper = styled.div`
  margin-left: 2.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 54rem;
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
