import clsx from 'clsx';
import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';

import Button from '../../common/Button';

interface Props {
  value: number;
  selected: boolean;
  setClicked: Dispatch<SetStateAction<number | null>>;
}

const RateItem: FunctionComponent<Props> = ({
  value,
  selected,
  setClicked,
}: Props) => (
  <div>
    <Button
      className={clsx(
        'rounded p-2',
        selected && 'border-2 border-dark-text',
      )}
      type="button"
      onClick={() => setClicked(value)}
    >
      <p>{value}</p>
    </Button>
  </div>
);

export default RateItem;
