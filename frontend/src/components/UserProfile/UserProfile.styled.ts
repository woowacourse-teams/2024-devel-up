import { styled } from 'styled-components';

export const PageContainer = styled.div`
  width: 100rem;
  margin: 0 auto;
  display: flex;
  margin-top: 5.8rem;
`;

export const UserProfileWrapper = styled.div`
  background: var(--grey-50);
  width: 37rem;
  height: 53rem;
`;

export const CommentWrapper = styled.div``;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

// 사용자 이미지
export const ProfileImage = styled.img`
  border-radius: 100%;
  width: 20rem;
  height: 20rem;
`;

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.3rem;
`;

// 사용자 이름
export const ProfileInfoText = styled.p`
  word-break: break-all;
  min-width: 100%;
  text-align: center;
`;

export const ProfileNameText = styled(ProfileInfoText)`
  font-weight: bold;
  font-size: 2rem;
`;

// 사용자 한줄 소개
export const DescriptionInput = styled.input`
  min-width: 100%;
  border: 1px solid var(--grey-200);
`;

export const DescriptionForm = styled.form`
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
