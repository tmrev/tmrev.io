import clsx from 'clsx';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  useCallback, useState,
} from 'react';

import Input from '../components/common/Input';
import MetaTags from '../components/common/MetaTag';
import { getRunningOperationPromises, search, useSearchQuery } from '../redux/api';
import { wrapper } from '../redux/store';
import { debounce, extractNameFromEmail } from '../utils/common';
import imageUrl from '../utils/imageUrl';
import { createMediaUrl } from '../utils/mediaID';

interface Props {
  q?: string
}

const Search:NextPage<Props> = ({ q }:Props) => {
  const [query, setQuery] = useState<string>(q || '');
  const router = useRouter();

  const { data } = useSearchQuery(query, { skip: !query });

  const queryChnageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    if (!e.target.value) {
      router.pathname = '/search';
      router.replace(router, undefined, { shallow: true });
    } else {
      router.query.q = e.target.value;
      router.replace(router, undefined, { shallow: true });
    }
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
            <a className={
              clsx(
                'flex flex-col items-center justify-center text-center space-y-4',
                'm-4 rounded aspect-moviePoster h-[200px]  md:h-[280px] text-white border border-white',
                'hover:bg-tmrev-gray-dark p-1',
              )
            }
            >
              <div className="relative h-1/2 w-full">
                <Image
                  alt={`${value.firstName} ${value.lastName} profile`}
                  layout="fill"
                  objectFit="contain"
                  src={value.photoUrl || `https://avatars.dicebear.com/api/identicon/${value.uuid}.svg`}
                />
              </div>
              <h1 className=" space-x-2">
                <span className="font-semibold">User</span>
                <span>|</span>
                <span className="break-all">
                  {renderName(value)}
                </span>
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
          <Link key={value._id} passHref href={`/user/${value.userId}/list/${value._id}`}>
            <a className={
              clsx(
                'flex flex-col items-center justify-center text-center space-y-4',
                'm-4 rounded aspect-moviePoster h-[200px]  md:h-[280px] text-white border border-white',
                'hover:bg-tmrev-gray-dark p-1',
              )
            }
            >
              <div className="relative h-1/2 w-full">
                <Image
                  alt={`${value.title} watchlist`}
                  layout="fill"
                  objectFit="contain"
                  src={`https://avatars.dicebear.com/api/identicon/${value._id}.svg`}
                />
              </div>
              <h1 className=" space-x-2">
                <span className="font-semibold">List</span>
                <span>|</span>
                <span className="break-all">
                  {value.title}
                </span>
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
          );
        })}
      </>
    );
  };

  return (
    <div className="flex-col w-full h-screen bg-black">
      <MetaTags
        description="Looking for the best movies? Reviews from real users can help you find the right one. Lists from experts can help you find what you're looking for."
        title="Find the latest movies and user lists on the world's largest movie review site."
        url={`https://tmrev.io/search?q=${query}`}
      />
      <div className="sticky mt-16 lg:mt-0 top-0 bg-tmrev-gray-dark p-5 w-full right-0 left-0 rounded z-30 mb-4">
        <Input defaultValue={query} placeholder="Search..." onChange={debounceQuery} />
      </div>
      <div className="flex flex-wrap justify-start space-x-4 items-center overflow-hidden mt-8">
        {renderWatchListSearchQuery()}
        {renderUserListQuery()}
        {renderMovieSearchQuery()}
      </div>
    </div>
  );
};

export default Search;

Search.defaultProps = {
  q: '',
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const q = context.query?.q;

    if (typeof q === 'string') {
      store.dispatch(search.initiate(q));
    }

    await Promise.all(getRunningOperationPromises());

    return {
      props: {
        q: q || '',
      },
    };
  },
);
