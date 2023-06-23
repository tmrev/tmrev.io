import React from 'react'

import MoviePoster, { LocationPath } from '@/components/poster'
import { NoImage } from '@/constants'
import { MovieGeneral } from '@/models/tmdb/movie/tmdbMovie'
import imageUrl from '@/utils/imageUrl'

interface Props {
  movies: MovieGeneral[]
  limit?: number
}

const HorizontalScroll: React.FC<Props> = ({movies, limit}: Props) => (
  <div className="grid grid-rows-1 grid-flow-col gap-3 overflow-x-auto pb-3">
    {
      movies.slice(0, limit || 10).map((movie) => (
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


HorizontalScroll.defaultProps = {
  limit: 10
}

export default HorizontalScroll