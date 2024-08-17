import { styled } from 'styled-components';

export const PageContainer = styled.div`
  width: 50rem;
  height: 50rem;
  margin: 0 auto;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5.8rem 0;
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
  margin-bottom: 4rem;
`;

// 사용자 이름
export const ProfileInfoText = styled.p`
  ${(props) => props.theme.font.heading3}
  word-break: break-all;
  min-width: 100%;
  text-align: center;
`;

// 사용자 한줄 소개
export const DescriptionInput = styled.input`
  min-width: 100%;
  border: 1px solid ${(props) => props.theme.colors.grey200};
`;

export const DescriptionForm = styled.form`
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
