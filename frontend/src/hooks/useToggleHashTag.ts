import { useState } from 'react';

const useToggleHashTag = () => {
  const [selectedHashTag, setSelectedHashTag] = useState('');

  return { selectedHashTag, setSelectedHashTag };
};

export default useToggleHashTag;
