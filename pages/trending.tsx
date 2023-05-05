import type { NextPage } from 'next';
import React from 'react';

import Screen from '@/components/landing-page/screen';
import { useGetDiscoverMovieQuery } from '@/redux/api';

const Trending: NextPage = () => {
  const { data: movieData } = useGetDiscoverMovieQuery({ page: 1 });

  return (
    <div className="snap-mandatory snap-y h-screen w-screen overflow-scroll overflow-x-hidden">
      {movieData
        && movieData.results.map((movie) => (
          <Screen key={movie.id} movie={movie} />
        ))}
    </div>
  );
};

export default Trending;
