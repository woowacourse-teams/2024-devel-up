import type { Member } from '@/types/solution';
import type { UserInfo } from '@/types/user';
import { useCallback, useEffect } from 'react';

interface InitializeInputsParams {
  isEditMode: boolean;
  userInfo: UserInfo | undefined;
  member: Member;
  inputTitle: string;
  inputDescription: string;
  inputUrl: string;
  handleTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleUrl: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useInitializeInputs = ({
  isEditMode,
  userInfo,
  member,
  inputTitle,
  inputDescription,
  inputUrl,
  handleTitle,
  handleDescription,
  handleUrl,
}: InitializeInputsParams) => {
  const setInitialInputValues = useCallback(() => {
    if (!isEditMode || member?.id !== userInfo?.id) return;
    
    if (inputTitle)
      handleTitle({ target: { value: inputTitle } } as React.ChangeEvent<HTMLInputElement>);
    if (inputDescription)
      handleDescription({
        target: { value: inputDescription },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    if (inputUrl) handleUrl({ target: { value: inputUrl } } as React.ChangeEvent<HTMLInputElement>);
  }, [isEditMode, userInfo?.id, member?.id, inputTitle, inputDescription, inputUrl]);

  useEffect(() => {
    setInitialInputValues();
  }, [setInitialInputValues]);
};
