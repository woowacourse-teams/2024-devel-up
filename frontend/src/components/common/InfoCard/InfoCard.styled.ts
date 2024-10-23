import media from '@/styles/mediaQueries';
import styled from 'styled-components';

export const InfoCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const Title = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${(props) => props.theme.font.bodyBold}
`;

export const Description = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;

  color: ${(props) => props.theme.colors.grey500};
  margin-top: 0.5rem;
  ${(props) => props.theme.font.body}

  ${media.medium`
    -webkit-line-clamp: 2;
    `}
`;

export const TagWrapper = styled.ul`
  display: flex;
  gap: 0.8rem;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
