import styled from 'styled-components';
import ContentBanner from '@/assets/images/ContentBanner.svg';

export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  margin: 0 auto;
  margin-bottom: 10rem;
  padding-top: 6rem;
  width: fit-content;
`;

export const MissionListTitle = styled.h2`
  ${(props) => props.theme.font.heading1}
  margin-bottom: 3rem;
`;

export const BannerContent = styled(ContentBanner)`
  width: 100%;
  height: 100%;
`;
