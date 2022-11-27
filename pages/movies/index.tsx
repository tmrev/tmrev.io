import Image from 'next/image';
import Link from 'next/link';
import React, {
  FunctionComponent, useEffect, useMemo, useState,
} from 'react';

import MetaTags from '../../components/common/MetaTag';
import usePrevious from '../../hooks/usePrevious';
import { DiscoverMovieResult } from '../../models/tmdb';
import { getDiscoverMovie, getRunningOperationPromises, useGetDiscoverMovieQuery } from '../../redux/api';
import { wrapper } from '../../redux/store';
import { debounce } from '../../utils/common';
import imageUrl from '../../utils/imageUrl';
import { createMediaUrl } from '../../utils/mediaID';

const Movies:FunctionComponent = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [combined, setCombined] = useState<DiscoverMovieResult[]>([]);
  const currentResult = useGetDiscoverMovieQuery({ page: currentPage }, { skip: currentPage > 1 });
  const nextResult = useGetDiscoverMovieQuery({ page: currentPage + 1 });
  const prevPage = usePrevious(currentPage);

  useEffect(() => {
    if (!currentResult.data || !nextResult.data) return;

    if (currentPage === 1) {
      setCombined([...currentResult.data.results, ...nextResult.data.results]);
    }
  }, [currentResult, currentPage, nextResult]);

  useEffect(() => {
    if (currentPage < 2 || !nextResult.data || prevPage === currentPage) return;
    setCombined((prevState) => [...prevState, ...nextResult.data!.results]);
  }, [nextResult, currentPage]);

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
      <div className="flex flex-wrap justify-start space-x-4 items-center overflow-hidden mt-8">
        {combined.map((value, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Link key={i} passHref href={`/movie/${createMediaUrl(value.id, value.title)}`}>
            <a className="relative m-4 rounded aspect-moviePoster h-[200px]  md:h-[280px]">
              <Image
                alt={`${value.title} poster`}
                className="rounded"
                layout="fill"
                objectFit="cover"
                src={imageUrl(value.poster_path || '', 300)}
              />
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
