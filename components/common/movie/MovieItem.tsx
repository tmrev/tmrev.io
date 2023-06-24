import Image from 'next/image';
import React from 'react';

import { Movie } from '../../../models/tmdb';
import formatDate from '../../../utils/formatDate';
import imageUrl from '../../../utils/imageUrl';
import Button from '../Button';

interface MovieItemProps {
  movie: Movie
  index: number
  // eslint-disable-next-line no-unused-vars
  handleMovieRemove: (index: number) => void
}

const MovieItem = ({ movie, index, handleMovieRemove }:MovieItemProps) => (
  <div className="flex items-center space-x-4 cursor-move border p-2 rounded bg-black z-50">
    <div className="p-2">
      <p className="text-2xl font-bold">{index + 1}</p>
    </div>
    <div className="rounded relative aspect-moviePoster h-28 z-0">
      <Image
        fill 
        alt={movie.title} 
        className="rounded select-none object-cover" 
        src={imageUrl(movie.poster_path || '')} 
      />
    </div>
    <div className="flex-grow">
      <h3 className="text-lg lg:text-xl font-semibold">
        {`${movie.title} (${formatDate(movie.release_date)})`}
      </h3>
    </div>
    <div className="grid max-w-sm grid-cols-2 mx-auto text-center divide-x">
      <div>
        <Button variant="icon" onClick={() => handleMovieRemove(index)}>
          <span className="material-icons-outlined">
            close
          </span>
        </Button>
      </div>
      <div className="p-2 flex items-center opacity-70">
        <span className="material-icons-outlined">
          drag_indicator
        </span>
      </div>
    </div>
  </div>
);

export default MovieItem;
