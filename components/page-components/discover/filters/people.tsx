import clsx from 'clsx'
import React, { useCallback, useState } from 'react'
import AsyncSelect from 'react-select/async'

import Chip from '@/components/chip'
import { IBaseSearchResponse } from '@/models/tmdb/search'
import { Selected } from '@/pages/discover'
import customStyles from '@/styles/reactSelectStyle'
import { debounce } from '@/utils/common'

interface Value {
  label: string
  value: number
}

interface Props {
  selectedPeople: Selected | undefined
  setSelectedPeople: React.Dispatch<React.SetStateAction<Selected | undefined>>
}

const fetchPeople = async (q: string): Promise<IBaseSearchResponse> => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
  const res = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${q}`);

  const data = await res.json()

  const sorted = data.results.sort((a: any, b: any) => b.popularity - a.popularity)

  return {
    ...data,
    results: sorted
  }
}

const PeopleFilter: React.FC<Props> = ({
  selectedPeople,
  setSelectedPeople
}: Props) => {
  const [values, setValues] = useState<Value[]>([])
  const queryChangeHandler = (inputValue: string, callback: any) => {
    fetchPeople(inputValue).then((d) => {
      if (d) {
        const formattedData = d.results.map((v) => ({
          label: v.name,
          value: v.id
        }))

        setValues(formattedData);
        callback(formattedData);
      }
    });
  };

  const handleAddPeople = (name: string, id: number) => {
    const newPeople = {
      ...selectedPeople,
      [id]: name
    }

    setSelectedPeople(newPeople)
  }

  const handleRemovePeople = (id: number) => {
    const newPeople = {
      ...selectedPeople
    }

    delete newPeople[id]

    setSelectedPeople(newPeople)
  }

  const handlePeople = (name: string, id: number) => {
    if(selectedPeople && selectedPeople[id]){
      handleRemovePeople(id)
    } else {
      handleAddPeople(name, id)
    }
  }


  const debounceQuery = useCallback(debounce(queryChangeHandler, 300), []);

  const handleSetData = (data: Value) => {
    handlePeople(data.label, data.value)
  };

  return (
    <div className='space-y-3'>
      <label className='text-white' htmlFor="people-filter">People</label>
      <AsyncSelect
        cacheOptions
        className="focus:ring-0 border-0 ring-0 focus:ring-black"
        defaultOptions={values}
        loadOptions={debounceQuery}
        placeholder="Search for people..."
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
      {selectedPeople && (
        <div className="flex flex-wrap -m-1 text-white" id="watch-providers">
          {Object.keys(selectedPeople).map((key) => (
            <Chip
              key={key}
              className={
                clsx('m-1')
              } 
              onClick={() => handleRemovePeople(+key)}
            >
              {selectedPeople[+key]}
            </Chip>
          ))}
        </div>
      )}

    </div>
  )
}

export default PeopleFilter