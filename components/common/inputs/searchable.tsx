import React, { useCallback, useState } from 'react';
import AsyncSelect from 'react-select/async';

import { SearchResponse } from '../../../models/tmrev/search';
import { ReactSelect } from '../../../pages/user/[id]/list/create';
import { tmrevAPI } from '../../../redux/api';
import customStyles from '../../../styles/reactSelectStyle';
import { debounce } from '../../../utils/common';
import formatDate from '../../../utils/formatDate';

const filterData = (data: SearchResponse | undefined): ReactSelect[] => {
  if (data && data.body) {
    return data.body.tmdb.results.map((d) => ({
      label: `${d.title} (${formatDate(d.release_date)})`,
      movie: d,
      value: d.id,
    })) as any[];
  }

  return [];
};

const fetchSearch = async (search: string): Promise<SearchResponse | undefined> => {
  const res = await fetch(`${tmrevAPI}/search?q=${search}`);

  const data = await res.json();

  return data;
};

interface Props {
  setData: React.Dispatch<React.SetStateAction<ReactSelect[]>>
}

const SearchableInput = ({ setData }: Props) => {
  const [values, setValues] = useState<ReactSelect[]>([]);
  const queryChangeHandler = (inputValue: string, callback: any) => {
    fetchSearch(inputValue).then((d) => {
      if (d) {
        setValues(filterData(d));
        callback(filterData(d));
      }
    });
  };

  const debounceQuery = useCallback(debounce(queryChangeHandler, 300), []);

  const handleSetData = (data: ReactSelect) => {
    setData((prevState) => {
      if (prevState.length) {
        return [...prevState, data];
      }

      return [data];
    });
  };

  return (
    <AsyncSelect
      cacheOptions
      className="focus:ring-0 border-0 ring-0 focus:ring-black"
      defaultOptions={values}
      loadOptions={debounceQuery}
      styles={customStyles}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: '#3B3B3B',
        },
      })}
      onChange={(v: any) => handleSetData(v)}
    />
  );
};

export default SearchableInput;
