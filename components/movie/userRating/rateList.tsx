import React, {
  FunctionComponent, memo, useEffect, useState,
} from 'react';

import RateItem from './rateItem';

interface Props {
  label: string;
  // eslint-disable-next-line no-unused-vars
  setValue: (value: number | null) => void;
  defaultValue?: number | null;
}

const array = [1, 3, 5, 7, 9];

const RateList: FunctionComponent<Props> = ({
  setValue,
  label,
  defaultValue,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(
    defaultValue || null,
  );

  useEffect(() => {
    if (!defaultValue) return;
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue, setValue]);

  return (
    <div className="text-dark-text">
      <p className="mb-2">
        {label}
      </p>
      <div className="flex flex-wrap justify-between items-center">
        {array.map((value) => (
          <RateItem
            key={value}
            selected={selectedValue === value}
            setClicked={setSelectedValue}
            value={value}
          />
        ))}
      </div>
    </div>
  );
};

RateList.defaultProps = {
  defaultValue: null,
};

export default memo(RateList);
