import useUserInfo from '@/hooks/useUserInfo';
import UserProfileImage from '@/components/userProfile/UserProfileImage';
import * as S from '@/components/userProfile/UserProfile.styled';
import UserProfileName from '@/components/userProfile/UserProfileName';
import UserProfileEmail from '@/components/userProfile/UserProfileEmail';
import UserProfileDescription from '@/components/userProfile/UserProfileDescription';

export default function UserProfilePage() {
  const { userInfo } = useUserInfo();

  // TODO API 콜 함수 내부에서 undefined 처리를 해주어야 할것 같아 임시로 처리해놓습니다. @버건디
  if (!userInfo) {
    return <div></div>;
  }

  return (
    <S.PageContainer>
      <UserProfileImage avatar_url={userInfo.avatar_url} />
      <UserProfileName name={userInfo.name} />
      <UserProfileEmail email={userInfo.email} />
      <UserProfileDescription description={userInfo.description} />
    </S.PageContainer>
  );
}
