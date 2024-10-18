import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 4rem;
  margin: 0 auto;
  margin-bottom: 10rem;
  padding: 3.5rem 0;
  width: 100rem;

  @media (max-width: 1024px) {
    width: 80rem;
    padding: 3rem 0;
    gap: 3rem;
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 2.5rem 0;
    gap: 2rem;
    flex-direction: column;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
`;

export const ProfileAndCurrentPathWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 28rem;
  padding: 3rem;

  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;

  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const ProfileImageWrapper = styled.div`
  width: 7.6rem;
  height: 7.5rem;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colors.grey400};
  overflow: hidden;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const ProfileName = styled.span`
  ${(props) => props.theme.font.bodyBold}
  text-align: center;
  margin-top: 1rem;
`;

export const PathWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem 3.5rem;
  border-top: 1px solid ${(props) => props.theme.colors.grey200};

  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
    border: none;
    margin: 0 auto;
    padding: 0;
  }
`;

export const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.8rem;
`;

export const Path = styled.span<{ $isSelected: boolean }>`
  ${(props) => props.theme.font.body}
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.black : theme.colors.grey400)};
`;

export const Circle = styled.div<{ $isSelected: boolean }>`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary500 : theme.colors.grey400};
  margin-right: 1rem;
`;

export const CurrentPathText = styled.div`
  ${(props) => props.theme.font.bodyBold}
`;
