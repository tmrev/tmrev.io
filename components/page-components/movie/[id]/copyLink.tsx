import React, { FunctionComponent, useState } from 'react';

import Button from '../../../common/Button';

interface Props {
  link: string
}

const CopyLink:FunctionComponent<Props> = ({ link }:Props) => {
  const [success, setSuccess] = useState<boolean>(false);

  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
    }
  };

  return (
    <Button variant="icon" onClick={copyToClipBoard}>
      <span className="material-icons">
        {success ? 'done' : 'link'}
      </span>
    </Button>
  );
};

export default CopyLink;
