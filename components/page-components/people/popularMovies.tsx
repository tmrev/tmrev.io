import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import HeaderText from '@/components/common/typography/headerText'
import { PersonQuery } from '@/models/tmdb/person'
import { useGetPersonMostPopularMoviesQuery } from '@/redux/api/tmdb/peopleAPI'
import imageUrl from '@/utils/imageUrl'
import { createMediaUrl, parseMediaId } from '@/utils/mediaID'


const PopularMovies = () => {
  const router = useRouter()
  const { id } = router.query

  const payload: PersonQuery = useMemo(() => ({  
    personId: parseMediaId(id as string)
  }), [id])

  const { data } = useGetPersonMostPopularMoviesQuery(payload)
  
  if(!data || !data.length) return null

  return (
    <section className='space-y-3'>
      <HeaderText>Popular Movies</HeaderText>
      <div className="grid grid-rows-1 grid-flow-col gap-3 overflow-x-auto pb-3">
        {data.slice(0, 10).map((movie) => (
          <Link 
            key={movie.id}
            passHref className="aspect-[2/3] w-[150px] lg:w-[185px] relative rounded" href={`/movie/${createMediaUrl(movie.id, movie.title)}`}>
            <Image
              fill
              priority
              alt={`${movie.title} poster`}
              className="rounded object-contain"
              src={imageUrl(movie.poster_path || '', 300, true)}
            />
          </Link>
        ))}
      </div>
      <button 
        className='w-full border border-tmrev-alt-yellow text-tmrev-alt-yellow p-2 rounded uppercase' 
        type='button'>Filmography
      </button>
    </section>
  )
}

export default PopularMovies