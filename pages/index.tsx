import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Typography from '../components/common/typography';
import Screen from '../components/landing-page/screen';
import Navigation from '../components/navigation';
import { useGetDiscoverMovieQuery, useGetDiscoverTvQuery } from '../redux/api/tmdbAPI';
import imageUrl from '../utils/imageUrl';

const Home: NextPage = () => {
  const { data: movieData } = useGetDiscoverMovieQuery({ page: 1 });
  const { data: tvData } = useGetDiscoverTvQuery({ page: 1 });

  // TODO: refactor not sure how to update font dynamically
  const renderTitle = (title: string, url: string) => (
    <>
      <Link passHref href={url}>
        <a className="hover:underline text-white hidden lg:block">
          <Typography variant="h1">{title}</Typography>
        </a>
      </Link>
      <Link passHref href={url}>
        <a className="hover:underline text-white lg:hidden block">
          <Typography variant="h3">{title}</Typography>
        </a>
      </Link>
    </>
  );

  return (
    <div className=" overflow-x-hidden flex">
      <Navigation />
      <div className="snap-mandatory snap-y h-screen w-screen overflow-scroll overflow-x-hidden">
        {movieData && movieData.results.map((movie) => (
          <Screen key={movie.id} movie={movie} />
        ))}
        {tvData && tvData.results.map((tv) => (
          <div key={tv.id} className="snap-center relative flex justify-center items-center h-screen w-full">
            <Image priority layout="fill" objectFit="cover" src={imageUrl(tv.backdrop_path || '', undefined, false)} />
            <div className=" absolute bottom-0 top-0 right-0 left-0 bg-black opacity-40" />
            <div className="absolute z-40 bottom-8 left-8 max-w-[50%]">
              <p className="text-tmrev-alt-yellow font-bold tracking-widest">TV</p>
              {renderTitle(tv.name, '/')}
            </div>
            <div className="absolute bottom-8 right-8">
              <Typography className="text-white" variant="h1">{tv.vote_average}</Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
