import type { UserInfo } from '@/types';
import * as S from './UserProfile.styled';

type UserProfileNameProps = Pick<UserInfo, 'name'>;

//TODO 현재 깃허브에서 name이 영문으로 받아와지는거 같은데
// 이 부분에 대해서 논의 필요 할것 같습니다 @버건디

export default function UserProfileName({ name }: UserProfileNameProps) {
  return (
    <S.InfoContainer>
      <S.ProfileInfoText>{name}</S.ProfileInfoText>
    </S.InfoContainer>
  );
}
