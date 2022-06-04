import type { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

import Typography from '../components/common/typography';
import { useGetDiscoverMovieQuery } from '../redux/api/tmdbAPI';
import imageUrl from '../utils/imageUrl';

const Home: NextPage = () => {
  const { data, isLoading } = useGetDiscoverMovieQuery({ page: 1 });

  if (isLoading) {
    return (
      <div className=" overflow-x-hidden flex">
        <aside className="w-[385px] bg-white h-screen p-8">
          <Typography className=" text-tmrev-purple-main" variant="h3">TMREV</Typography>
        </aside>
        <div className="snap-mandatory snap-y h-screen w-screen overflow-scroll overflow-x-hidden">
          <div className="snap-center flex justify-center items-center h-screen w-full bg-teal-600">
            <Typography variant="h1">Loading...</Typography>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className=" overflow-x-hidden flex">
      <aside className="hidden lg:block w-[385px] bg-white h-screen p-8">
        <Typography className=" text-tmrev-purple-main" variant="h3">TMREV</Typography>
      </aside>
      <div className="snap-mandatory snap-y h-screen w-screen overflow-scroll overflow-x-hidden">
        {data && data.results.map((movie) => (
          <div key={movie.id} className="snap-center relative flex justify-center items-center h-screen w-full">
            <Image priority layout="fill" objectFit="cover" src={imageUrl(movie.backdrop_path || '', undefined, false)} />
            <div className=" absolute bottom-0 top-0 right-0 left-0 bg-black opacity-40" />
            <div className="absolute z-50 bottom-8 left-8 max-w-[50%]">
              <p className="text-tmrev-alt-yellow font-bold tracking-widest">MOVIE</p>
              <Typography className="text-white" variant="h1">{movie.title}</Typography>
            </div>
            <div className=" absolute bottom-8 right-8">
              <Typography className="text-white" variant="h1">{movie.vote_average}</Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
