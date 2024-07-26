import useUserInfo from '@/hooks/useUserInfo';
import UserProfileImage from '@/components/UserProfile/UserProfileImage';
import * as S from '@/components/UserProfile/UserProfile.styled';
import UserProfileName from '@/components/UserProfile/UserProfileName';
import UserProfileEmail from '@/components/UserProfile/UserProfileEmail';
import UserProfileDescription from '@/components/UserProfile/UserProfileDescription';

export default function UserProfilePage() {
  const { data: userInfo } = useUserInfo();

  // TODO API 콜 함수 내부에서 undefined 처리를 해주어야 할것 같아 임시로 처리해놓습니다. @버건디
  if (!userInfo) {
    return <div></div>;
  }

  return (
    <S.PageContainer>
      <UserProfileImage imageUrl={userInfo.imageUrl} />
      <UserProfileName name={userInfo.name} />
      <UserProfileEmail email={userInfo.email} />
      <UserProfileDescription description={userInfo.description} />
    </S.PageContainer>
  );
}
