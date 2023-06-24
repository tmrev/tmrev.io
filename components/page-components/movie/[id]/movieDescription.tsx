import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { FunctionComponent, useMemo, useState } from 'react'

import Chip from '@/components/chip';
import ProviderItem from '@/components/movieWatchProvider/Item';
import { MOVIE_GENRE } from '@/constants/movies';
import { Genre, IMDB } from '@/models/tmdb'
import { Body } from '@/models/tmrev/movie';
import { formatRuntime, numberShortHand } from '@/utils/common';
import getCounty from '@/utils/getCounty';
import { createMediaUrl } from '@/utils/mediaID';

interface Props {
  overview: string
  imdb?: IMDB
  tmdb: {
    vote_average: number;
    vote_count: number;
    id: number
    title: string;
  }
  genres: Genre[]
  runtime: number
  ageRating?: string
  movie: Body
}

const MovieDescription: FunctionComponent<Props> = ({
  overview,
  imdb,
  tmdb,
  genres,
  runtime,
  ageRating,
  movie
}: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  const watchProvider = useMemo(() => {
    const county = getCounty();

    if (county && movie.watchProvider) {
      return movie.watchProvider[county];
    }

    return null;
  }, []);


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
        {runtime && (
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
        {ageRating && (
          <Chip data-tooltip-id='age rating'> 
            <div className='flex items-center space-x-3'>
              <span className="material-icons">
                personal_video
              </span>
              <span>
                {ageRating}
              </span>   
            </div> 
          </Chip>
        )}
      </div>
      {movie.watchProvider && watchProvider && watchProvider.flatrate?.length && (
        <div className='flex rounded-full bg-black -m-1 flex-wrap'>
          {watchProvider.flatrate?.map((provider) => (
            <ProviderItem
              key={provider.provider_id}
              className="m-1"
              data={provider}
              link={watchProvider.link}
            />
          ))}
        </div>
      )}
      {open && (
        <div className='flex flex-col space-y-3'>
          {imdb && (
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
          )}
          {tmdb && (
            <Chip className='m-1'>
              <Link  passHref className="flex items-center  space-x-2" href={`https://www.themoviedb.org/movie/${createMediaUrl(tmdb.id, tmdb.title)}`}>
                <Image
                  alt="tmdb"
                  className='flex-grow object-contain'
                  height={24}
                  src="/images/icons/tmdb/tmdb-icon.svg"
                  width={24}
                />
                <p className="opacity-75">
                  {tmdb.vote_average}
                </p>
                <p className="opacity-75">
                ({numberShortHand(Number(tmdb.vote_count))})
                </p>
              </Link>
            </Chip>
          )}
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

MovieDescription.defaultProps = {
  ageRating: undefined,
  imdb: undefined,
}

export default MovieDescription