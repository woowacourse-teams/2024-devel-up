import { HASHTAGS } from '@/constants/hashTags';
import { useState } from 'react';

const useToggleHashTag = () => {
  const [selectedHashTag, setSelectedHashTag] = useState(HASHTAGS.all);

  return { selectedHashTag, setSelectedHashTag };
};

export default useToggleHashTag;
