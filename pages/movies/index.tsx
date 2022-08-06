/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-shadow */
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, {
  FunctionComponent, useEffect, useMemo, useState,
} from 'react';

import MetaTags from '../../components/common/MetaTag';
import { getDiscoverMovie, getRunningOperationPromises, useGetDiscoverMovieQuery } from '../../redux/api';
import { wrapper } from '../../redux/store';
import { debounce } from '../../utils/common';
import imageUrl from '../../utils/imageUrl';
import { createMediaUrl } from '../../utils/mediaID';

const Movies:FunctionComponent = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const lastResult = useGetDiscoverMovieQuery(
    { page: currentPage - 1 },
    { skip: currentPage === 1 },
  );
  const currentResult = useGetDiscoverMovieQuery({ page: currentPage });
  const nextResult = useGetDiscoverMovieQuery({ page: currentPage + 1 });

  const combined = useMemo(() => {
    const arr = [];
    // eslint-disable-next-line no-loops/no-loops
    for (const data of [lastResult.data, currentResult.data, nextResult.data]) {
      if (data) {
        arr.push(...data.results);
      }
    }
    return arr;
  }, [currentPage, lastResult.data, currentResult.data, nextResult.data]);

  const onScroll = () => {
    if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight - 100) {
      setCurrentPage((prevState) => prevState + 1);
    }
  };

  const debouncedScroll = useMemo(() => debounce(onScroll, 500), []);

  useEffect(() => {
    window.addEventListener('scroll', debouncedScroll);

    return () => window.removeEventListener('scroll', debouncedScroll);
  }, []);

  if (!combined) return null;

  return (
    <div className="p-0 w-full mt-16 lg:mt-0">
      <MetaTags
        description="Discover new Movies"
        title="Browsing latest and most popular movies"
        url="/movies"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {combined.map((value) => (
          <Link key={value.id} passHref href={`/movie/${createMediaUrl(value.id, value.title)}`}>
            <a key={value.id} className="flex justify-center items-center">
              <div className={clsx(
                'bg-white relative aspect-[2/3] w-[250px] h-[400px]  rounded',
                'lg:w-[300px] lg:h-[500px]',
              )}
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={imageUrl(value.poster_path || '', 500)}
                />
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies;

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(getDiscoverMovie.initiate({ page: 1 }));

  await Promise.all(getRunningOperationPromises());

  return {
    props: {},
  };
});
