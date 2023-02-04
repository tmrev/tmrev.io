import React from 'react';

import Button from '../../Button';

interface TagItemProps {
  value: string,
  index: number,
  // eslint-disable-next-line no-unused-vars
  handleTagRemove: (index: number) => void
}

const TagItem = ({ value, index, handleTagRemove }: TagItemProps) => (
  <li className="flex items-center rounded m-1 bg-black p-1">
    <p className="flex-grow p-2">{value}</p>
    <Button variant="icon" onClick={() => handleTagRemove(index)}>
      <span className="material-icons-outlined">
        close
      </span>
    </Button>
  </li>
);

export default TagItem;
