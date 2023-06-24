import React from 'react'

import MoviePoster, { LocationPath } from '@/components/poster'
import { NoImage } from '@/constants'
import { MovieGeneral } from '@/models/tmdb/movie/tmdbMovie'
import imageUrl from '@/utils/imageUrl'

interface Props {
  movies: MovieGeneral[]
}

const HorizontalScroll: React.FC<Props> = ({movies}: Props) => (
  <div className="grid grid-rows-1 grid-flow-col gap-3 overflow-x-auto pb-3">
    {
      movies.map((movie) => (
        <MoviePoster 
          key={movie.id}
          imgUrl={ movie.poster_path ? imageUrl(movie.poster_path, 300, true) : NoImage} 
          location={LocationPath.MOVIE} 
          movieId={movie.id}
          name={movie.title}
        />
      ))
    }
  </div>
) 


export default HorizontalScroll