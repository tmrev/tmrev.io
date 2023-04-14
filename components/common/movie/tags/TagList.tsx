import React from 'react';

import TagItem from './TagItem';

interface Props {
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
}

const TagList = ({ tags, setTags }: Props) => {
  if (!tags.length) return null;

  const handleTagRemove = (index: number) => {
    const newArray = [...tags];

    newArray.splice(index, 1);

    setTags(newArray);
  };

  return (
    <div className="flex flex-wrap space-x-1">
      {[...new Set(tags)].map((v, i) => (
        <TagItem
          key={v}
          handleTagRemove={handleTagRemove}
          index={i}
          value={v}
        />
      ))}
    </div>
  );
};

export default TagList;
