import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, {
  FunctionComponent, useCallback, useEffect, useState,
} from 'react';

import Input from '../components/common/Input';
import {
  useGetSearchMovieQuery, useGetWatchListQuery, useSearchUserQuery,
} from '../redux/api';
import { debounce, extractNameFromEmail } from '../utils/common';
import imageUrl from '../utils/imageUrl';
import { createMediaUrl } from '../utils/mediaID';

const Search:FunctionComponent = () => {
  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: movieSearchData } = useGetSearchMovieQuery(
    { language: 'en-US', page: currentPage, query },
    { skip: !query },
  );
  const { data: watchListSearchData } = useGetWatchListQuery({ q: query }, { skip: !query });
  const { data: userListSearchData } = useSearchUserQuery(query, { skip: !query });

  useEffect(() => {
    if (query) {
      setCurrentPage(1);
    }
  }, [query]);

  const queryChnageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const debounceQuery = useCallback(debounce(queryChnageHandler, 300), []);

  const renderName = (value: any) => {
    if (value.firstName) {
      return `${value.firstName} ${value.lastName}`;
    }

    return extractNameFromEmail(value.email);
  };

  const renderUserListQuery = () => {
    if (!userListSearchData) return null;

    return (
      <>
        {userListSearchData.map((value) => (
          <Link key={value._id} passHref href={`/user/${value.uuid}`}>
            <a className={clsx(
              'flex-col text-center ',
              'text-white w-max h-[400px] lg:w-[300px] lg:h-[500px]',
              'w-[250px] lg:w-[300px]',
            )}
            >
              <div className={clsx(
                'bg-tmrev-gray-dark relative w-full h-[400px] p-2 rounded',
              )}
              >
                <Image
                  layout="fill"
                  objectFit="contain"
                  src={`https://avatars.dicebear.com/api/identicon/${value.uuid}.svg`}
                />
              </div>
              <h1 className="font-semibold text-xl">
                User |
                {' '}
                {renderName(value)}
              </h1>
            </a>
          </Link>
        ))}
      </>
    );
  };

  const renderWatchListSearchQuery = () => {
    if (!watchListSearchData) return null;

    return (
      <>
        {watchListSearchData.map((value) => (
          <Link key={value._id} passHref href={`/watch-list/${value._id}`}>
            <a className={clsx(
              'flex-col text-center ',
              'text-white w-max h-[400px] lg:w-[300px] lg:h-[500px]',
              'w-[250px] lg:w-[300px]',
            )}
            >
              <div className={clsx(
                'bg-tmrev-gray-dark relative w-full h-[400px] p-2 rounded',
              )}
              >
                <Image
                  layout="fill"
                  objectFit="contain"
                  src={`https://avatars.dicebear.com/api/identicon/${value._id}.svg`}
                />
              </div>
              <div className="flex-grow" />
              <h1 className="font-semibold text-xl">
                WatchList |
                {' '}
                {value.title}
              </h1>
            </a>
          </Link>
        ))}
      </>
    );
  };

  const renderMovieSearchQuery = () => {
    if (!movieSearchData) return null;

    return (
      <>
        {movieSearchData.results.map((value) => {
          if (!value.poster_path) return null;

          return (
            <Link key={value.id} passHref href={`/movie/${createMediaUrl(value.id, value.title)}`}>
              <a key={value.id} className="flex justify-center items-center">
                <div className={clsx(
                  'bg-black relative aspect-[2/3] w-[250px] h-[400px]  rounded',
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
          );
        })}
      </>
    );
  };

  return (
    <div className="flex-col w-full h-screen bg-black">
      <div className="sticky mt-16 lg:mt-0 top-0 bg-tmrev-gray-dark p-5 w-full right-0 left-0 rounded z-30 mb-4">
        <Input placeholder="Search..." onChange={debounceQuery} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 overflow-hidden">
        {renderWatchListSearchQuery()}
        {renderUserListQuery()}
        {renderMovieSearchQuery()}
      </div>
    </div>
  );
};

export default Search;
