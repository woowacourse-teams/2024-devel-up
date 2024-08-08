import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { UserInfo } from '@/types/user';
import * as S from './UserProfile.styled';

type UserProfileDescription = Pick<UserInfo, 'description'>;

export default function UserProfileDescription({ description }: UserProfileDescription) {
  const [isEdit, setIsEdit] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(description ? description : '');

  const handleFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    //TODO 서버 로직을 작성해야합니다
    // 그러려면 mutation 함수를 작성할거 같은데
    // 이부분은 백엔드분들이랑 한번 이야기를 해보아야할것 같아서
    // 일단 여기까지 구현해둘게요! @버건디
    console.log(descriptionValue);
  };

  const handleEditableDescription = () => {
    setIsEdit((prev) => !prev);
  };

  const handleDescriptionValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setDescriptionValue(value);
  };

  return (
    <S.InfoContainer>
      {isEdit ? (
        <S.DescriptionForm onSubmit={handleFormSubmit}>
          <S.DescriptionInput value={descriptionValue} onChange={handleDescriptionValue} />
          <button onClick={handleEditableDescription} type="submit">
            저장
          </button>
        </S.DescriptionForm>
      ) : descriptionValue.length ? (
        <>
          <S.ProfileInfoText>{descriptionValue}</S.ProfileInfoText>
          <button onClick={handleEditableDescription}>수정</button>
        </>
      ) : (
        <>
          <S.ProfileInfoText>나만의 한줄 소개를 작성해보세요!</S.ProfileInfoText>
          <button onClick={handleEditableDescription}>작성</button>
        </>
      )}
    </S.InfoContainer>
  );
}
