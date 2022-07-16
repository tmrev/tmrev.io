import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import Typography from '../../components/common/typography';
import Crew from '../../components/movie/crew';
import Reviews from '../../components/movie/reviews';
import { MovieQuery, ReleaseDate } from '../../models/tmdb';
import { getMovie, getRunningOperationPromises, useGetMovieQuery } from '../../redux/api';
import { wrapper } from '../../redux/store';
import { formatRuntime, numberShortHand } from '../../utils/common';
import formatDate from '../../utils/formatDate';
import imageUrl from '../../utils/imageUrl';
import { parseMediaId } from '../../utils/mediaID';

interface Props {}

const MoviePage: NextPage<Props> = () => {
  const router = useRouter();

  const { id } = router.query;

  const payload: MovieQuery | null = useMemo(() => {
    if (typeof id === 'string') {
      return {
        movie_id: parseMediaId(id),
      };
    }

    return null;
  }, []);

  // eslint-disable-next-line max-len
  const { data } = useGetMovieQuery(payload || skipToken, { skip: router.isFallback });

  const directors = useMemo(() => {
    if (!data) return [];

    return data.credits.crew.filter((cast) => cast.job === 'Director');
  }, [data]);

  const producers = useMemo(() => {
    if (!data) return [];

    return data.credits.crew.filter((cast) => cast.job === 'Producer');
  }, [data]);

  const writers = useMemo(() => {
    if (!data) return [];

    return data.credits.crew.filter((cast) => cast.job === 'Screenplay');
  }, [data]);

  const ageRating:ReleaseDate[] = useMemo(() => {
    if (!data) return [];

    const result = data.release_dates.results.find((dataResults) => dataResults.iso_3166_1 === 'US');

    if (!result) return [];

    return result.release_dates;
  }, [data]);

  if (!data) return null;

  return (
    <div className="dark:bg-black bg-white relative flex flex-col justify-center items-center w-full">
      <div className="relative w-full h-96 lg:h-[500px]">
        <Image priority layout="fill" objectFit="cover" src={imageUrl(data.backdrop_path)} />
        <div className=" absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent dark:to-black to-white h-full w-full" />
      </div>
      <div className="px-0 lg:px-8 mt-0 lg:-mt-16 z-30">
        <div className={clsx(
          'dark:bg-black bg-white p-8 flex',
          'lg:rounded',
        )}
        >
          <div className="flex dark:text-white text-black">
            <div className="hidden lg:flex lg:flex-col mr-8">
              <Image
                priority
                className="rounded"
                height={500}
                objectFit="cover"
                src={imageUrl(data.poster_path || '', 400, true)}
                width={350}
              />
              <div className="max-w-[350px]">
                <div className="flex items-center w-full mt-4">
                  <h2 className=" text-xl font-semibold">Rating</h2>
                  <span className="flex-grow" />
                  <Link passHref href={`https://www.imdb.com/title/${data.imdb_id}/`}>
                    <a className="flex items-center space-x-2">
                      <Image height={32} objectFit="contain" src="/images/icons/imdb/imdb-icon.svg" width={32} />
                      <p className="opacity-75">
                        {data.imdb?.averageRating}
                      </p>
                      <p className="opacity-75">
                        (
                        {numberShortHand(Number(data.imdb?.numVotes)) }
                        )
                      </p>
                    </a>
                  </Link>
                </div>
                <div className="flex items-center w-full mt-4">
                  <h2 className="text-xl font-semibold">Genres</h2>
                  <span className="flex-grow" />
                  <p className="flex flex-wrap items-center max-w-[150px] space-x-2">
                    {data.genres.map((value) => (
                      <Link key={value.id} passHref href="#">
                        <a className="hover:underline">
                          <span>{value.name}</span>
                        </a>
                      </Link>
                    ))}
                  </p>
                </div>
                <div className="flex items-center w-full mt-4">
                  <h2 className="text-xl font-semibold">Runtime</h2>
                  <span className="flex-grow" />
                  <p className="flex flex-wrap items-center max-w-[150px] space-x-2">
                    {formatRuntime(data.runtime)}
                  </p>
                </div>
                <div className="flex items-center w-full mt-4">
                  <h2 className="text-xl font-semibold">Age Rating</h2>
                  <span className="flex-grow" />
                  <p className="flex flex-wrap items-center max-w-[150px] space-x-2">
                    {ageRating.length && ageRating[0].certification}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-3">

              <div className="max-w-sm md:max-w-lg 2xl:max-w-5xl">
                <p className="text-tmrev-alt-yellow font-bold tracking-widest">MOVIE</p>
                <Typography className="flex flex-wrap items-center" variant="h1">
                  {data.title}
                  <span className=" ml-2 text-2xl dark:opacity-75 opacity-50">
                    (
                    {formatDate(data.release_date)}
                    )
                  </span>
                </Typography>
                <p className="mt-8">{data.overview}</p>
              </div>
              <div className="divide-y mt-8 mb-40">
                <Crew cast={directors} title="Directors" />
                <Crew cast={producers} title="Producers" />
                <Crew cast={writers} title="Writers" />
              </div>
              <div className="!my-16" />
              <div className="divide-y mt-40 space-y-8">
                <h2 className="text-tmrev-alt-yellow font-bold tracking-widest text-2xl">POPULAR REVIEWS</h2>
                {data.tmrevReviews.map((value) => (
                  <Reviews key={value._id} review={value} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id;
    if (typeof id === 'string') {
      store.dispatch(getMovie.initiate({ movie_id: parseMediaId(id) }));
    }

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  },
);

export default MoviePage;
