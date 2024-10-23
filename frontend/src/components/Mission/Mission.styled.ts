import { styled } from 'styled-components';
import media from '@/styles/mediaQueries';

export const MissionListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 5rem;
  row-gap: 3.6rem;
  margin: 0 auto;
  margin-bottom: 10rem;
  padding-top: 3rem;
  width: 100%;

  ${media.medium`
  grid-template-columns: repeat(1, 1fr);
    padding: 1.6rem;
    `}
`;

export const MissionItemContainer = styled.article`
  width: 100%;
  max-width: 30rem;
  border-radius: 1rem;
  border: 1px solid ${(props) => props.theme.colors.grey200};
  cursor: pointer;
  margin: 0 auto;
`;

export const MissionThumbnailImg = styled.img`
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  height: 23rem;
  object-fit: cover;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey200};
`;

export const MissionInfoWrapper = styled.div`
  padding: 2.5rem;
`;

export const MissionDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const MissionTitle = styled.p`
  ${(props) => props.theme.font.bodyBold}
  color: black;
  margin-bottom: 1.7rem;
`;

export const MissionSummary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  ${(props) => props.theme.font.body}
  color: ${(props) => props.theme.colors.grey500};
`;

export const MissionHashTagWrapper = styled.div`
  display: flex;
  margin-top: 6.2rem;
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    width: 2px; /* 세로 스크롤바의 너비 */
    height: 2px; /* 가로 스크롤바의 높이 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* 스크롤바의 색상 */
  }

  &::-webkit-scrollbar-track {
    background-color: transparent; /* 스크롤바 트랙의 색상 */
  }
`;

export const MissionHashTag = styled.span`
  background: ${(props) => props.theme.colors.primary50};
  border-radius: 0.8rem;
  padding: 0.4rem 0.8rem;
  text-align: center;
  display: inline-block;
  justify-content: center;
  align-items: center;
  margin-right: 0.8rem;
  min-width: 4.7rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${(props) => props.theme.font.badge}
  flex-shrink: 0;
`;
