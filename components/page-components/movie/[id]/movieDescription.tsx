import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { FunctionComponent, useState } from 'react'

import Chip from '@/components/chip';
import ProviderItem from '@/components/movieWatchProvider/Item';
import { MOVIE_GENRE } from '@/constants/movies';
import ISO3166_1 from '@/models/tmdb/ISO3166-1';
import { MovieGeneral } from '@/models/tmdb/movie/tmdbMovie';
import { useGetMovieReleaseDatesQuery, useGetMovieWatchProvidersQuery } from '@/redux/api/tmdb/movieAPI';
import { formatRuntime, numberShortHand } from '@/utils/common';
import { createMediaUrl } from '@/utils/mediaID';

interface Props {
  movie: MovieGeneral
}

const MovieDescription: FunctionComponent<Props> = ({
  movie
}: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const {runtime, vote_average, vote_count, id, title, genres, overview} = movie

  const { data: watchProvider } = useGetMovieWatchProvidersQuery({movie_id: id})
  const { data: releaseDates } = useGetMovieReleaseDatesQuery({movie_id: id})

  return (
    <button 
      className={
        clsx(
          'space-y-3 rounded p-1 bg-black w-full h-full',
          'text-left transition-height duration-200 ease-out',
          'flex flex-col justify-start'
        )
      }
      type='button' 
      onClick={() => setOpen(!open)}>
      <div className='flex rounded-full flex-wrap space-x-2 bg-black m-1'>
        {!!movie.budget && (
          <Chip data-tooltip-id='budget'> 
            <div className='flex items-center space-x-3'>
              <span className="material-icons">
              account_balance
              </span>
              <span>
                {numberShortHand(movie.budget)}
              </span>   
            </div> 
          </Chip>
        )}
        {!!runtime && (
          <Chip data-tooltip-id='runtime'> 
            <div className='flex items-center space-x-3'>
              <span className="material-icons-outlined">
              timer
              </span>
              <span>
                {formatRuntime(runtime)} 
              </span>   
            </div> 
          </Chip>
        )}
        {releaseDates && releaseDates.results.find((dataResults) => 
          dataResults.iso_3166_1 === ISO3166_1.UNITED_STATES)?.release_dates[0].certification && (
          <Chip data-tooltip-id='age rating'> 
            <div className='flex items-center space-x-3'>
              <span className="material-icons">
                personal_video
              </span>
              <span>
                {releaseDates.results.find((dataResults) => 
                  dataResults.iso_3166_1 === ISO3166_1.UNITED_STATES)?.release_dates[0].certification
                }
              </span>   
            </div> 
          </Chip>
        )}
      </div>
      {watchProvider && watchProvider.results[ISO3166_1.UNITED_STATES] && (
        <div className='flex rounded-full bg-black -m-1 flex-wrap'>
          {watchProvider.results[ISO3166_1.UNITED_STATES].flatrate?.map((provider) => (
            <ProviderItem
              key={provider.provider_id}
              className="m-1"
              data={provider}
              link={watchProvider.results[ISO3166_1.UNITED_STATES].link}
            />
          ))}
        </div>
      )}
      {open && (
        <div className='flex flex-col space-y-3'>
          {/* {imdb && (
            <Chip className='m-1 w-min'>      
              <Link passHref className="flex items-center space-x-2" href={`https://www.imdb.com/title/${imdb?.uid}/`}>
                <Image
                  alt="imdb"
                  className='object-contain'
                  height={32}
                  src="/images/icons/imdb/imdb-icon.svg"
                  width={32}
                />
                <p className="opacity-75">
                  {imdb?.averageRating}
                </p>
                <p className="opacity-75">
                  (
                  {numberShortHand(Number(imdb?.numVotes)) }
                  )
                </p>
              </Link>
            </Chip>
          )} */}
          <Chip className='m-1 w-fit'>
            <Link  passHref className="flex items-center  space-x-2" href={`https://www.themoviedb.org/movie/${createMediaUrl(id, title)}`}>
              <Image
                alt="tmdb"
                className='object-contain'
                fetchPriority='low'
                height={24}
                src="/images/icons/tmdb/tmdb-icon.svg"
                width={24}
                
              />
              <p className="opacity-75">
                {vote_average}
              </p>
              <p className="opacity-75">
                ({numberShortHand(Number(vote_count))})
              </p>
            </Link>
          </Chip>
          {!!genres.length && (
            <div className='flex rounded-full space-x-2 bg-black m-1 w-min'>
              {genres.map((value) => (
                <Chip 
                  key={value.id} 
                  title={value.name} >
                  {(MOVIE_GENRE as any)[value.name.toUpperCase()]}
                </Chip>
              ))}
            </div>
          )}
          <Chip className=' rounded'>
            <p>{overview}</p>
          </Chip>
         
        </div>
      )}
    </button>
  )
}

export default MovieDescription