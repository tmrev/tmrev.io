import clsx from 'clsx';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import nookies from 'nookies';
import React from 'react';

import HeaderText from '../../../components/common/typography/headerText';
import { Movie } from '../../../models/tmdb';
import { WatchList } from '../../../models/tmrev';
import { apiKey, tmdbAPI, tmrevAPI } from '../../../redux/api';
import imageUrl from '../../../utils/imageUrl';
import { createMediaUrl } from '../../../utils/mediaID';

const fetchWatchList = async (id: string, token?: string): Promise<WatchList> => {
  const res = await fetch(
    `${tmrevAPI}/watch-list/${id}`,
    {
      headers: {
        Authorization: token,
      } as any,
    },
  );

  const data = await res.json();
  return data;
};

interface Props {
  watchList?: WatchList
  movies?: Record<string, Movie>
}

const UserWatchList: NextPage<Props> = ({ watchList, movies }:Props) => {
  if (!watchList || !movies) return null;

  return (
    <div>
      <div className=" bg-tmrev-gray-dark p-4 w-full">
        <HeaderText headingType="h1">
          Test
        </HeaderText>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4 items-start mt-4">
        {watchList.movies.map((movieId) => {
          const value = movies[movieId];
          return (
            <Link key={value.id} passHref href={`/movie/${createMediaUrl(value.id, value.title)}`}>
              <a key={value.id} className="flex justify-center items-center rounded">
                <div className={clsx(
                  'bg-white relative aspect-[2/3] w-[250px] h-[400px]  rounded',
                  'lg:w-[300px] lg:h-[500px]',
                )}
                >
                  <Image
                    className="rounded"
                    layout="fill"
                    objectFit="cover"
                    src={imageUrl(value.poster_path || '', 500)}
                  />
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

UserWatchList.defaultProps = {
  movies: undefined,
  watchList: undefined,
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const cookies = nookies.get(context);

  try {
    if (id && typeof id === 'string') {
      const watchList = await fetchWatchList(id, cookies.token);
      const moviePromises = watchList.movies.map((movieId) => fetch(`${tmdbAPI}movie/${movieId}?api_key=${apiKey}`).then((resp) => resp.json()));

      const movies = await Promise.all(moviePromises);

      let movieRecord:Record<string, Movie> = {};

      movies.forEach((movie) => {
        movieRecord = {
          [movie.id]: movie,
          ...movieRecord,
        };
      });

      return {
        props: {
          movies: movieRecord,
          watchList,
        },
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default UserWatchList;
