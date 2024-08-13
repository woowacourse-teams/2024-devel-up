import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 5rem;
  margin: 0 auto;
  margin-bottom: 10rem;
  padding: 3.5rem 0;
  width: 100rem;
`;

export const ContentWrapper = styled.div``;

export const ProfileAndCurrentPathWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
`;

export const ProfileImageWrapper = styled.div`
  width: 7.6rem;
  height: 7.5rem;
  border-radius: 50%;
  border: 1px solid var(--grey-400);
  overflow: hidden;
  padding: 1rem;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const ProfileName = styled.span`
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  margin-top: 1rem;
`;

export const PathWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem 3.5rem;
  border-top: 1px solid var(--grey-200);
`;

export const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.8rem;
`;

export const Path = styled.span<{ $isSelected: boolean }>`
  font-size: 1.6rem;
  color: ${({ $isSelected }) => ($isSelected ? 'var(--black-color)' : 'var(--grey-400)')};
`;

export const Circle = styled.div<{ $isSelected: boolean }>`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: ${({ $isSelected }) => ($isSelected ? 'var(--primary-500)' : 'var(--grey-400)')};
  margin-right: 1rem;
`;
