import clsx from 'clsx';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@/components/common/Button';
import HeaderText from '@/components/common/typography/headerText';
import { Movie } from '@/models/tmdb';
import { WatchList } from '@/models/tmrev';
import { useAuth } from '@/provider/authUserContext';
import { apiKey, tmdbAPI, tmrevAPI } from '@/redux/api';
import { setMovies, setWatchList } from '@/redux/slice/watchListSlice';
import formatDate from '@/utils/formatDate';
import imageUrl from '@/utils/imageUrl';
import { createMediaUrl } from '@/utils/mediaID';

const fetchWatchList = async (
  id: string,
  token?: string,
): Promise<WatchList> => {
  const res = await fetch(`${tmrevAPI}/watch-list/${id}`, {
    headers: {
      Authorization: token,
    } as any,
  });

  const data = await res.json();
  return data;
};

interface Props {
  watchList?: WatchList;
  movies?: Record<string, Movie>;
}

const UserWatchList: NextPage<Props> = ({ watchList, movies }: Props) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  const isOwner = useMemo(() => {
    if (!user || !watchList) return false;

    if (user.uid === watchList.userId) return true;

    return false;
  }, [user, watchList]);

  useEffect(() => {
    if (!watchList || !movies) return;

    dispatch(setWatchList(watchList));
    dispatch(setMovies(movies));
  }, [watchList, movies]);

  useEffect(() => {
    router.prefetch(`/user/${user?.uid}/list/${router.query.watchListId}/edit`);
  }, [router.query.id]);

  const renderEdit = () => {
    if (!isOwner) return null;

    return (
      <Button
        className="w-full"
        variant="secondary"
        onClick={() => router.push(
          `/user/${user?.uid}/list/${router.query.watchListId}/edit`,
        )}
      >
        Update List
      </Button>
    );
  };

  if (!watchList || !movies) return null;

  return (
    <div className="w-full mt-16 lg:mt-0">
      <div className="p-4 flex flex-col items-center space-y-4 text-white w-full">
        <div className="w-full">
          <HeaderText headingType="h1">{watchList.title}</HeaderText>
          <p>{watchList.description}</p>
        </div>
        {renderEdit()}
      </div>
      <div className="flex flex-col flex-wrap justify-center space-y-4 p-2 md:p-4">
        {watchList.movies.map((movieId, index) => {
          const {
            title, id, poster_path, release_date,
          } = movies[movieId];
          return (
            <Link
              key={id}
              passHref
              href={`/movie/${createMediaUrl(id, title)}`}
            >
              <a
                key={id}
                className="flex w-full hover:bg-tmrev-gray-dark items-center space-x-4 p-2 border rounded text-white"
              >
                <div className="p-2">
                  <p className="text-xl font-bold">{index + 1}</p>
                </div>
                <div
                  className={clsx(
                    'bg-white relative aspect-[2/3] h-[120px] rounded',
                  )}
                >
                  <Image
                    fill
                    priority
                    alt={`${title} poster`}
                    className="rounded object-cover"
                    src={imageUrl(poster_path || '', 500)}
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold">
                    {`${title} (${formatDate(
                      release_date,
                    )})`}
                  </p>
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
  const { watchListId } = context.query;
  const cookies = nookies.get(context);

  try {
    if (watchListId && typeof watchListId === 'string') {
      const watchList = await fetchWatchList(watchListId, cookies.token);
      const moviePromises = watchList.movies.map((movieId) => fetch(`${tmdbAPI}movie/${movieId}?api_key=${apiKey}`).then((resp) => resp.json()));

      const movies = await Promise.all(moviePromises);

      let movieRecord: Record<string, Movie> = {};

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
