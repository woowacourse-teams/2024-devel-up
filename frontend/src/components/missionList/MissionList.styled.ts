import styled from 'styled-components';

export const MissionListContainer = styled.div`
  margin: 0 auto;
  width: fit-content;
  padding-top: 3rem;
`;

export const MissionListTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 3rem;
`;

export const MissionList = styled.div`
  display: flex;
  gap: 4rem;
  width: fit-content;
`;

export const MissionItemContainer = styled.article`
  width: 35rem;

  border-radius: 1rem;
  border: 1px solid var(--grey-200);
  cursor: pointer;
`;

export const MissionThumbnailImg = styled.img`
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  height: 23rem;
  object-fit: cover;
  border-bottom: 1px solid var(--grey-200);
`;

export const MissionDescription = styled.div`
  padding: 2.2rem;
`;

export const MissionTitle = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: black;
  margin-bottom: 1.7rem;
`;

export const TagWrapper = styled.div`
  display: flex;
  gap: 0.7rem;
`;

const BaseTag = styled.div`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.3rem 1rem;
  border-radius: 0.5rem;
`;

export const PopularTag = styled(BaseTag)`
  color: #ff850a;
  background-color: #fff7de;
`;

export const BackendTag = styled(BaseTag)`
  font-weight: 700;
  color: #b07219;
  background-color: #faf5f2;
`;

export const InsuranceTag = styled(BaseTag)`
  color: var(--primary-600);
  background-color: var(--primary-50);
`;

export const HorizontalLine = styled.div`
  border-top: 1px solid var(--grey-200);
  margin: 2.2rem 0;
`;

export const MissionPrice = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
`;
