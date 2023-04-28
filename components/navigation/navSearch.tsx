import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import useOutsideClick from '@/hooks/useOutsideClick';

export enum Topic {
  // eslint-disable-next-line no-unused-vars
  MOVIE = 'movie',
  // eslint-disable-next-line no-unused-vars
  PEOPLE = 'people',
  // eslint-disable-next-line no-unused-vars
  YEAR = 'year',
}

interface SearchTopic {
  label: string
  icon: string
  // eslint-disable-next-line react/no-unused-prop-types
  topic?: Topic
}

interface SavedSearches {
  search: string
  context?: SearchTopic
}

interface Props {}



interface ChipProps extends SearchTopic {
  onClick: () => void
  compact?: boolean
}

const localStorageSearch = 'searches'

const NavSearchChip: FunctionComponent<ChipProps> = ({label, icon, onClick, compact}: ChipProps) => (
  <button 
    className={
      clsx(
        'rounded-full border border-tmrev-gray-dark hover:bg-tmrev-gray-dark',
        'flex space-x-1 items-center justify-center mr-2',
        compact ? 'w-max px-2' : 'w-24'
      )
    }
    type='button' 
    onClick={onClick}>
    <span className='text-sm material-icons'>
      {icon}
    </span>
    {!compact && (
      <span className='text-xs'>
        {label}
      </span>
    )}

  </button>
)

NavSearchChip.defaultProps = {
  compact: false,
  topic: undefined
}

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


  useEffect(() => {
    const results = localStorage.getItem(localStorageSearch)

    if(results) {
      setPrevSearches(JSON.parse(results))
    }
  }, [router])

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

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

    setFocused(false)
    divRef.current?.blur()

    if(searchTopic?.topic){
      router.push(`/search?q=${search}&topic=${searchTopic?.topic || Topic.MOVIE}`)
    }
  }

  const handlePrevSearch = (s: SavedSearches) => {
    setFocused(false)
    divRef.current?.blur()


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
      ref={divRef}
      className='lg:w-full max-w-lg mx-4 relative h-10'
      onFocus={() => setFocused(true)}>
      <form 
        className='h-full w-full'
        onSubmit={handleSearch}
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
            )}
            placeholder='Search...'
            value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
        </div>
        <div className={
          clsx(
            'absolute rounded-b z-30 bg-tmrev-gray-mid w-full',
            focused ? "flex flex-col space-y-3" : "hidden",
            'transition-all duration-300',
            'p-1 lg:p-3 text-white'
          )
        }>
          <div>
            <span className='text-xs lg:text-sm'>I&apos;m searching by:</span>
            <div className='flex-wrap flex'>
              <NavSearchChip icon="movie" label='Movies' 
                onClick={() => setSearchTopic({
                  icon: "movie",
                  label: "Movies",
                  topic: Topic.MOVIE
                })} />
              <NavSearchChip icon='people' label='People' 
                onClick={() => setSearchTopic({
                  icon: "people",
                  label: "People",
                  topic: Topic.PEOPLE
                })}  />
              <NavSearchChip icon='calendar_today' label='Years' 
                onClick={() => setSearchTopic({
                  icon: "calendar_today",
                  label: "Years",
                  topic: Topic.YEAR
                })}  />
            </div>
          </div>
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