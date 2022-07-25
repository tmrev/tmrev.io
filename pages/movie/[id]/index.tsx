import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import CopyLink from '../../../components/movie/copyLink';
import CreateReviewButton from '../../../components/movie/createReviewButton';
import Crew from '../../../components/movie/crew';
import MetaData from '../../../components/movie/metaData';
import MovieRevenue from '../../../components/movie/movieRevenue';
import MovieStats from '../../../components/movie/movieStats';
import MovieReviewList from '../../../components/movie/reviews/reviewList';
import { MovieQuery, ReleaseDate } from '../../../models/tmdb';
import { getMovie, getRunningOperationPromises, useGetMovieQuery } from '../../../redux/api';
import { wrapper } from '../../../redux/store';
import formatDate from '../../../utils/formatDate';
import imageUrl from '../../../utils/imageUrl';
import { parseMediaId } from '../../../utils/mediaID';

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

  const { data } = useGetMovieQuery(
    payload || skipToken,
    { skip: router.isFallback },
  );

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
          'dark:bg-black bg-white p-0 md:p-8 flex',
          'lg:rounded',
        )}
        >
          <div className="flex dark:text-white text-black">
            <div className="hidden lg:flex lg:flex-col mr-8">
              <Image
                priority
                className="rounded aspect-[2/3]"
                height={500}
                objectFit="cover"
                src={imageUrl(data.poster_path || '', 400, true)}
                width={350}
              />
              <CreateReviewButton />
              <MetaData
                ageRating={ageRating.length ? ageRating[0].certification : ''}
                genres={data.genres}
                imdb={data.imdb}
                runtime={data.runtime}
                tmdb={
                  {
                    id: data.id,
                    title: data.title,
                    vote_average: data.vote_average,
                    vote_count: data.vote_count,
                  }
                }
              />
            </div>
            <div className="flex flex-col space-y-3">
              <div className="max-w-sm md:max-w-lg 2xl:max-w-5xl">
                <span className="flex items-center space-x-2">
                  <p className="text-tmrev-alt-yellow font-bold tracking-widest">MOVIE</p>
                  <CopyLink link={`https://tmrev.io${router.asPath}`} />
                </span>
                <h1 className="flex flex-wrap items-center text-3xl lg:text-6xl font-semibold">
                  <span className="mr-2">
                    {data.title}
                  </span>
                  <span className="text-lg lg:text-2xl dark:opacity-75 opacity-50">
                    (
                    {formatDate(data.release_date)}
                    )
                  </span>
                </h1>
                <p className="mt-8">{data.overview}</p>
                <div className="w-full lg:hidden">
                  <CreateReviewButton />
                </div>
              </div>
              <div className="divide-y mt-8 mb-40">
                <Crew cast={directors} title="Directors" />
                <Crew cast={producers} title="Producers" />
                <Crew cast={writers} title="Writers" />
              </div>
              <div className="!space-y-16 !mt-16 md:!mt-[7rem]">
                <div className="block lg:hidden">
                  <h2 className="text-tmrev-alt-yellow font-bold tracking-widest text-2xl">INFORMATION</h2>
                  <MetaData
                    ageRating={ageRating.length ? ageRating[0].certification : ''}
                    genres={data.genres}
                    imdb={data.imdb}
                    runtime={data.runtime}
                    tmdb={
                      {
                        id: data.id,
                        title: data.title,
                        vote_average: data.vote_average,
                        vote_count: data.vote_count,
                      }
                    }
                  />
                </div>
                <MovieReviewList reviews={data.tmrevReviews} />
                <MovieStats id={id as string} />
                <MovieRevenue dataSet="Weekend Box Office Performance" title={data.title} year={data.release_date.split('-')[0]} />
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
