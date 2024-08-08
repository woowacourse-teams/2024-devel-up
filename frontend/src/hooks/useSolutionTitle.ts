import { ChangeEvent, useState } from 'react';

// TODO 피그마 시안대로 일단 최대 50글자로 둡니다 @버건디
const MAX_SOLUTION_TITLE_LENGTH = 50;

const useSolutionTitle = () => {
  const [solutionTitle, setSolutionTitle] = useState('');
  const [isSolutionTitleError, setIsSolutionTitleError] = useState(false);
  const isValidSolutionTitle =
    solutionTitle.length && solutionTitle.length < MAX_SOLUTION_TITLE_LENGTH;

  const handleSolutionTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSolutionTitle(value);
    setIsSolutionTitleError(false);
  };

  return {
    solutionTitle,
    handleSolutionTitle,
    isValidSolutionTitle,
    isSolutionTitleError,
    setIsSolutionTitleError,
  };
};

export default useSolutionTitle;
