/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-shadow */
import Image from 'next/image';
import Link from 'next/link';
import React, {
  FunctionComponent, useCallback, useEffect, useMemo, useState,
} from 'react';

import Input from '../components/common/Input';
import { useGetSearchMovieQuery } from '../redux/api';
import { debounce } from '../utils/common';
import imageUrl from '../utils/imageUrl';
import { createMediaUrl } from '../utils/mediaID';

const Search:FunctionComponent = () => {
  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const lastResult = useGetSearchMovieQuery(
    { language: 'en-US', page: currentPage - 1, query },
    { skip: currentPage === 1 },
  );
  const currentResult = useGetSearchMovieQuery(
    { language: 'en-US', page: currentPage, query },
  );
  const nextResult = useGetSearchMovieQuery(
    { language: 'en-US', page: currentPage + 1, query },
  );

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

  const queryChnageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const debounceQuery = useCallback(debounce(queryChnageHandler, 300), []);

  return (
    <div className="flex-col w-full">
      <div className="sticky top-0 bg-tmrev-gray-dark p-5 w-full right-0 left-0 rounded z-40 mb-4">
        <Input placeholder="Search..." onChange={debounceQuery} />
      </div>
      <div className="grid content-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {combined.map((value) => (
          <Link key={value.id} passHref href={`/movie/${createMediaUrl(value.id, value.title)}`}>
            <a key={value.id}>
              <div className="bg-black relative aspect-[2/3] w-[400px] h-[600px]">
                <Image
                  className="rounded"
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

export default Search;
