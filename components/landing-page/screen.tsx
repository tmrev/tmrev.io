import Image from 'next/image';
import Link from 'next/link';
import React, { FunctionComponent, useMemo } from 'react';

import { DiscoverMovieResult, MovieQuery } from '../../models/tmdb';
import { useGetMovieQuery } from '../../redux/api';
import imageUrl from '../../utils/imageUrl';
import { createMediaUrl } from '../../utils/mediaID';
import Typography from '../common/typography';

interface Props {
  movie: DiscoverMovieResult
}

const renderTitle = (title: string, url: string) => (
  <>
    <Link passHref href={`/movie/${url}`}>
      <a className="hover:underline text-white hidden lg:block">
        <Typography variant="h1">{title}</Typography>
      </a>
    </Link>
    <Link passHref href={`/movie/${url}`}>
      <a className="hover:underline text-white lg:hidden block">
        <Typography variant="h3">{title}</Typography>
      </a>
    </Link>
  </>
);

const Screen:FunctionComponent<Props> = ({ movie }: Props) => {
  const payload:MovieQuery = useMemo(() => ({
    movie_id: movie.id,
  }), [movie]);

  const { data } = useGetMovieQuery(payload);

  return (
    <div key={movie.id} className="snap-center relative flex justify-center items-center h-screen w-full transition-all duration-300">
      <Image priority layout="fill" objectFit="cover" src={imageUrl(movie.backdrop_path || '', undefined, false)} />
      <div className=" absolute bottom-0 top-0 right-0 left-0 bg-black opacity-40" />
      <div className="absolute z-40 bottom-8 left-8 max-w-[50%]">
        <p className="text-tmrev-alt-yellow font-bold tracking-widest">MOVIE</p>
        {renderTitle(movie.title, createMediaUrl(movie.id, movie.title))}
      </div>
      <div className="absolute flex flex-col bottom-8 right-8">
        <Image height={32} src="/images/icons/imdb/imdb-icon.svg" width={64} />
        <Typography className="text-white" variant="h1">{data && data.imdb.averageRating}</Typography>
      </div>
    </div>
  );
};

export default Screen;
