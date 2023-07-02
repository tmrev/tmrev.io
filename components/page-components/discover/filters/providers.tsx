import clsx from 'clsx'
import React, { useState } from 'react'

import Chip from '@/components/chip'
import { useGetWatchProviderListQuery } from '@/redux/api/tmdb/movieAPI'

interface Props {
  selectedProviders: Record<number, string> | undefined
  setSelectedProviders: React.Dispatch<React.SetStateAction<Record<number, string> | undefined>>
}

const providerInitLimit = 8

const ProviderFilter: React.FC<Props> = ({
  selectedProviders,
  setSelectedProviders
}: Props) => {
  const { data: watchProviders} = useGetWatchProviderListQuery(
    {params: {language: "en-US", watch_region: "US"}})
  const [providerLimit, setProviderLimit] = useState<number>(providerInitLimit)

  const handleAddProvider = (name: string, id: number) => {
    const newProviders = {
      ...selectedProviders,
      [id]: name
    }

    setSelectedProviders(newProviders)
  } 

  const handleRemoveProvider = (id: number) => {
    const newProviders = {
      ...selectedProviders,
    }

    delete newProviders[id]

    setSelectedProviders(newProviders)
  }

  const handleProvider = (name: string, id: number) => {
    if(selectedProviders && selectedProviders[id]) {
      handleRemoveProvider(id)
    } else {
      handleAddProvider(name, id)
    }
  }

  const handleViewMoreProviders = () => {
    setProviderLimit(providerLimit + 10)
  }

  return (
    <div className="space-y-3">
      <label className="text-white" htmlFor="watch-providers">Watch Providers</label>
      <div className="flex flex-wrap -m-1 text-white" id="watch-providers">
        {watchProviders?.results.slice(0, providerLimit).map(({provider_id, provider_name}) => (
          <Chip
            key={provider_id} 
            className={
              clsx(
                'm-1',  
                selectedProviders && selectedProviders[provider_id] && 'bg-tmrev-alt-yellow text-black')
            }
            onClick={() => handleProvider(provider_name, provider_id)} 
          >
            {provider_name}
          </Chip>
        ))}
      </div>
      <div className="space-x-3">
        <button className="text-blue-400" type="button" onClick={handleViewMoreProviders} >See More</button> 
        {providerLimit !== providerInitLimit && (
          <button 
            className="text-blue-400"
            type="button" 
            onClick={() => setProviderLimit(providerInitLimit)} 
          >
        See Less
          </button> 
        )}
      </div>
    </div>
  )
}

export default ProviderFilter