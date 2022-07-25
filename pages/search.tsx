import Image from 'next/image';
import Link from 'next/link';
import React, {
  FunctionComponent, useCallback, useEffect, useState,
} from 'react';

import Input from '../components/common/Input';
import { useGetSearchMovieQuery } from '../redux/api';
import { debounce } from '../utils/common';
import imageUrl from '../utils/imageUrl';
import { createMediaUrl } from '../utils/mediaID';

const Search:FunctionComponent = () => {
  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data } = useGetSearchMovieQuery(
    { language: 'en-US', page: currentPage, query },
    { skip: !query },
  );

  useEffect(() => {
    if (query) {
      setCurrentPage(1);
    }
  }, [query]);

  const queryChnageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const debounceQuery = useCallback(debounce(queryChnageHandler, 300), []);

  const renderSearchQuery = () => {
    if (!data) return null;

    return (
      <>
        {data.results.map((value) => (
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
      </>
    );
  };

  return (
    <div className="flex-col w-full h-screen">
      <div className="sticky mt-16 lg:mt-0 top-0 bg-tmrev-gray-dark p-5 w-full right-0 left-0 rounded z-30 mb-4">
        <Input placeholder="Search..." onChange={debounceQuery} />
      </div>
      <div className="grid content-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {renderSearchQuery()}
      </div>
    </div>
  );
};

export default Search;
