/* eslint-disable jsx-a11y/no-static-element-interactions */
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'

import NavSearchChip from '@/components/navigation/search/navSearchChip'
import { ConstantSearchTopic, Topic } from '@/constants/search';
import useOutsideClick from '@/hooks/useOutsideClick';
import { capitalize, debounce } from '@/utils/common';

import AutoCompleteSuggest from './searchSuggestions';



export interface SearchTopic {
  label: string
  icon: string
  // eslint-disable-next-line react/no-unused-prop-types
  topic: Topic
}

export interface SavedSearches {
  search: string
  context?: SearchTopic
}

interface Props {}

const localStorageSearch = 'searches'


const NavSearch: FunctionComponent<Props> = () => {
  const [search, setSearch] = useState<string>("")
  const [prevSearches, setPrevSearches] = useState<SavedSearches[]>([])
  const [searchTopic, setSearchTopic] = useState<SearchTopic | undefined>({
    icon: "movie",
    label: "Movies",
    topic: Topic.MOVIE
  })
  const [focused, setFocused] = useState<boolean>(false)

  const divRef = useRef<HTMLDivElement>(null)

  useOutsideClick(divRef, () => setFocused(false))

  const router = useRouter();

  const setLocalStorage = () => {
    const results = localStorage.getItem(localStorageSearch)

    const searchContent: SavedSearches = {
      context: searchTopic,
      search
    }

    if(results) {
      let resultsArr = JSON.parse(results) as SavedSearches[]
      resultsArr = [searchContent, ...resultsArr]

      localStorage.setItem(localStorageSearch, JSON.stringify(resultsArr))
  
    } else {
      localStorage.setItem(localStorageSearch, JSON.stringify([{...searchContent}]))
    }    
  }

  useEffect(() => {
    const results = localStorage.getItem(localStorageSearch)

    if(results) {
      setPrevSearches(JSON.parse(results))
    }
  }, [router])

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLocalStorage()
    setFocused(false)
    divRef.current?.blur()

    if(searchTopic?.topic){
      router.push(`/search?q=${search}&topic=${searchTopic?.topic || Topic.MOVIE}`)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const debouncedSearch = useCallback(debounce(handleSearch, 300), [])

  const handlePrevSearch = (s: SavedSearches) => {
    setFocused(false)

    router.push(`/search?q=${s.search}&topic=${s.context?.topic || Topic.MOVIE}`)

    setSearch(s.search)
    setSearchTopic(s.context)
  }

  const handleClearResults = () => {
    localStorage.removeItem(localStorageSearch)

    setPrevSearches([])
  }


  return (
    <div       
      ref={divRef as any}
      className={
        clsx(
          'md:w-full md:relative max-w-lg md:mx-4 h-10',
          focused ? 'absolute top-0 left-0 right-0 z-40' : ' w-48',
          'transition-all duration-300 text-left'
        )
      }
      onFocus={() => setFocused(true)}
    >
      <form 
        className='h-full w-full'
        onSubmit={onSubmit}
      >
        <div className={clsx(
          'flex items-center h-full w-full  py-1 space-x-2 px-2 text-white',
          focused ? 'bg-tmrev-gray-dark rounded-t' : 'bg-tmrev-gray-mid rounded',
          'transition-colors duration-150'
        )}>
          <span className="material-icons">search</span>
          {searchTopic && (
            <NavSearchChip compact onClick={() => setSearchTopic(undefined)} {...searchTopic}/>
          )}
          <input
            className={clsx(
              'w-full h-full',
              ' bg-transparent text-white',
              'focus:outline-white focus:outline-0',
              "focus:ring-0"
            )}
            placeholder={`Search ${capitalize(searchTopic?.topic || '')}...`}
            onChange={debouncedSearch} 
          />
        </div>
        <div className={
          clsx(
            'absolute rounded-b z-30 bg-tmrev-gray-mid w-full',
            focused ? "flex flex-col space-y-3" : "hidden",
            'transition-all duration-300',
            'p-3 text-white'
          )
        }>
          <div>
            <span className='text-sm'>I&apos;m searching by:</span>
            <div className='flex-wrap flex'>
              {Object.values(ConstantSearchTopic).map((value) => (
                <NavSearchChip 
                  key={value.label} 
                  {...value}
                  onClick={() => setSearchTopic(ConstantSearchTopic[value.topic])} />
              ))}
            </div>
          </div>
          <AutoCompleteSuggest 
            handleClose={() => setFocused(false)} 
            handlePrevSearch={handlePrevSearch} 
            searchValue={search}
            setLocalStorage={setLocalStorage}
            topic={searchTopic?.topic}
          />
          {!!prevSearches.length && (
            <div>
              <div className='flex items-center py-3'>
                <span className='text-xs lg:text-sm flex-grow'>Recent:</span>
                <button 
                  className=' text-blue-400 hover:underline text-xs lg:text-sm' 
                  type='button' 
                  onClick={handleClearResults}>
                Clear search results
                </button>
              </div>
              <div className='flex space-y-3 flex-col max-h-52 overflow-auto pr-1'>
                {prevSearches.map((s, i) => (
                // eslint-disable-next-line react/no-array-index-key
                  <button key={i} className='flex items-center space-x-2 p-2 border rounded' type='button' onClick={() => handlePrevSearch(s)}>
                    <span className='text-sm material-icons'>
                      {s.context?.icon}
                    </span>
                    <p>{s.search}</p>
                  </button>
                ))}
              </div>
            </div>          
          )}
        </div>
      </form>
    </div>
  )
}

export default NavSearch