import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, {
  FunctionComponent, useCallback, useState,
} from 'react';

import Input from '../components/common/Input';
import { useSearchQuery } from '../redux/api';
import { debounce, extractNameFromEmail } from '../utils/common';
import imageUrl from '../utils/imageUrl';
import { createMediaUrl } from '../utils/mediaID';

const Search:FunctionComponent = () => {
  const [query, setQuery] = useState<string>('');

  const { data } = useSearchQuery(query, { skip: !query });

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
    if (!data?.body?.user) return null;

    const { user } = data.body;

    return (
      <>
        {user.map((value) => (
          <Link key={value._id} passHref href={`/user/${value.uuid}/preview`}>
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
                  alt={`${value.firstName} ${value.lastName} profile`}
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
    if (!data?.body?.watchList) return null;

    const { watchList } = data.body;

    return (
      <>
        {watchList.map((value) => (
          <Link key={value._id} passHref href={`/user/${value.userId}/watch-list/${value._id}`}>
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
                  alt={`${value.title} watchlist`}
                  layout="fill"
                  objectFit="contain"
                  src={`https://avatars.dicebear.com/api/identicon/${value._id}.svg`}
                />
              </div>
              <div className="flex-grow" />
              <h1 className="font-semibold text-xl">
                List |
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
    if (!data?.body?.tmdb) return null;

    const { tmdb } = data.body;

    return (
      <>
        {tmdb.results.map((value) => {
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
                    alt={`${value.title} poster`}
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
