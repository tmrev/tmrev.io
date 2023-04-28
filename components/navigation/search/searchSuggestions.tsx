import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'

import { NoImage } from '@/constants'
import { ConstantSearchTopic, Topic } from '@/constants/search'
import useSuggestion from '@/hooks/useSuggestions'
import imageUrl from '@/utils/imageUrl'
import { createMediaUrl } from '@/utils/mediaID'

import { SavedSearches } from '../navSearch'

interface Props {
  searchValue: string
  topic?: Topic
  // eslint-disable-next-line no-unused-vars
  handlePrevSearch: (s: SavedSearches) => void
  handleClose: () => void
  setLocalStorage: () => void
}

const AutoCompleteSuggest: FunctionComponent<Props> = ({
  searchValue, 
  topic, 
  handlePrevSearch,
  handleClose,
  setLocalStorage
}: Props) => {
  const router = useRouter()

  const { suggestYears, suggestMovies, suggestPeople } = useSuggestion(searchValue, topic)

  const handleRouter = (path: string) => {

    setLocalStorage()
    handleClose()
    router.push(path)
  }

  const renderSuggestedPeople = () => {
    if(!suggestPeople.length || topic !== Topic.PEOPLE) return null


    return (
      <>
        {suggestPeople.slice(0,5).map((people) => (
          <button
            key={people.id}
            type='button'
            onClick={() => handleRouter(`/people/${createMediaUrl(people.id, people.name)}`)}
          >
            <div className='flex items-center space-x-3'>
              <span className='material-icons' >search</span>
              <div className='relative aspect-square w-12 rounded'>
                <Image
                  alt={people.name}
                  className='rounded'
                  layout='fill'
                  objectFit='cover'
                  src={people.profile_path ? imageUrl(people.profile_path, 300, true) : NoImage}
                />
              </div>
              <span>{people.name}</span>
            </div>
          </button>
        ))}
      </>
    )
  }

  const renderSuggestedMovies = () => {
    if(!suggestMovies.length || topic !== Topic.MOVIE) return null

    return (
      <>
        {suggestMovies.slice(0,5).map((movie) => (
          <button
            key={movie.id}
            type='button'
            onClick={() => handleRouter(`/movie/${createMediaUrl(movie.id, movie.title)}`)}
          >
            <div className='flex items-center space-x-3 text-left'>
              <span className='material-icons' >search</span>
              <div className='relative aspect-moviePoster w-12 rounded'>
                <Image
                  alt={movie.title}
                  className='rounded'
                  layout='fill'
                  objectFit='cover'
                  src={movie.poster_path ? imageUrl(movie.poster_path , 300, true) : NoImage}
                />
              </div>
              <span>{movie.title}</span>
            </div>
          </button>
        ))}
      </>
    )
  }

  const renderSuggestedYears = () => {
    if(!suggestYears.length || topic !== Topic.YEAR) return null


    return (
      <>
        {suggestYears.map((year) => (
          <button 
            key={year}
            className={
              clsx(
                'text-left p-1 flex items-center space-x-3',
                'rounded hover:bg-tmrev-gray-dark'
              )
            } 
            type='button' 
            onClick={() => handlePrevSearch({
              context: ConstantSearchTopic[Topic.YEAR],
              search: year
            })}
          >
            <span className='material-icons' >search</span>
            <span>{year}</span>
          </button>
        ))}
      </>
    )
  }
 
  return (
    <div className='flex flex-col space-y-1'>
      <span className='text-xs lg:text-sm flex-grow'>Suggestion:</span>
      {renderSuggestedPeople()}
      {renderSuggestedMovies()}
      {renderSuggestedYears()}
    </div>
  )
}

AutoCompleteSuggest.defaultProps = {
  topic: undefined
}


export default AutoCompleteSuggest