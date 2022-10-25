import Image from 'next/image';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';

import { TmrevReview } from '../../models/tmrev';
import { useGetMovieQuery } from '../../redux/api';
import imageUrl from '../../utils/imageUrl';
import { createMediaUrl } from '../../utils/mediaID';

interface Props {
  movie: TmrevReview
}

const MoviePanel: FunctionComponent<Props> = ({ movie }:Props) => {
  const { data } = useGetMovieQuery({ movie_id: movie.tmdbID });

  if (!data) return null;

  return (
    <Link passHref href={`/movie/${createMediaUrl(movie.tmdbID, movie.title)}`}>
      <div>
        <div className="aspect-[2/3] h-[200px] w-[150px] md:h-[300px] md:w-[250px] relative rounded">
          <Image
            priority
            className="rounded"
            layout="fill"
            objectFit="contain"
            src={imageUrl(data.body.poster_path || '', 300, true)}
          />
          <h3
            className="w-max absolute top-2 right-4 md:top-4 md:right-9 font-bold text-xl text-tmrev-alt-yellow bg-black p-1 rounded"
          >
            {movie.averagedAdvancedScore}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default MoviePanel;
