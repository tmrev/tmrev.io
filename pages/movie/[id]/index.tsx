import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';

import MetaTags from '../../../components/common/MetaTag';
import HeaderText from '../../../components/common/typography/headerText';
import AddToWatchList from '../../../components/movie/addToWatchListButton';
import CopyLink from '../../../components/movie/copyLink';
import CreateReviewButton from '../../../components/movie/createReviewButton';
import Crew from '../../../components/movie/crew';
import MetaData from '../../../components/movie/metaData';
import MovieRevenue from '../../../components/movie/movieRevenue';
import MovieStats from '../../../components/movie/movieStats';
import MovieReviewList from '../../../components/movie/reviews/reviewList';
import WatchedButton from '../../../components/page-components/movie/watched/watchedButton';
import useFirebaseAuth from '../../../hooks/userAuth';
import { MovieQuery } from '../../../models/tmdb';
import { getMovie, getRunningOperationPromises, useGetMovieQuery } from '../../../redux/api';
import { wrapper } from '../../../redux/store';
import formatDate from '../../../utils/formatDate';
import imageUrl from '../../../utils/imageUrl';
import { createMediaUrl, parseMediaId } from '../../../utils/mediaID';

interface Props {}

const MoviePage: NextPage<Props> = () => {
  const router = useRouter();
  const { user } = useFirebaseAuth();

  const { id } = router.query;

  const payload: MovieQuery | null = useMemo(() => {
    if (typeof id === 'string') {
      return {
        movie_id: parseMediaId(id),
      };
    }

    return null;
  }, []);

  const { data, isLoading, isFetching } = useGetMovieQuery(
    payload || skipToken,
    { skip: router.isFallback },
  );

  const directors = useMemo(() => {
    if (!data) return [];

    return data.body.credits.crew.filter((cast) => cast.job === 'Director');
  }, [data]);

  const producers = useMemo(() => {
    if (!data) return [];

    return data.body.credits.crew.filter((cast) => cast.job === 'Producer');
  }, [data]);

  const writers = useMemo(() => {
    if (!data) return [];

    return data.body.credits.crew.filter((cast) => cast.job === 'Screenplay');
  }, [data]);

  const ageRating = useMemo(() => {
    if (!data) return [];

    const result = data.body.release_dates.results.find((dataResults) => dataResults.iso_3166_1 === 'US');

    if (!result) return [];

    return result.release_dates;
  }, [data]);

  const hasReviewed = useCallback(() => {
    if (!user || !data || !data.body.tmrev.reviews.length) return '';

    let reviewId = '';

    data.body.tmrev.reviews.forEach((review) => {
      if (review.userId === user.uid) reviewId = review._id;
    });

    return reviewId;
  }, [user, data]);

  if (!data) return null;

  return (
    <div>
      <MetaTags
        description={data.body.overview}
        image={imageUrl(data.body.poster_path || '', 400, true)}
        largeImage={imageUrl(data.body.backdrop_path || '')}
        title={data.body.title}
        url={createMediaUrl(data.body.id, data.body.title)}
      />
      <div className="dark:bg-black bg-white relative flex flex-col justify-center items-center w-full">
        <div className="relative w-full h-96 lg:h-[500px]">
          <Image priority layout="fill" objectFit="cover" src={imageUrl(data.body.backdrop_path)} />
          <div className=" absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent dark:to-black to-white h-full w-full" />
        </div>
        <div className="px-4 lg:px-8 mb-6 mt-0 lg:-mt-16 z-30">
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
                  src={imageUrl(data.body.poster_path || '', 400, true)}
                  width={350}
                />
                <CreateReviewButton hasReviewed={hasReviewed()} />
                <AddToWatchList movie={data.body} />

                <MetaData
                  ageRating={ageRating.length ? ageRating[0].certification : ''}
                  genres={data.body.genres}
                  imdb={data.body.imdb}
                  movie={data.body}
                  runtime={data.body.runtime}
                  tmdb={
                    {
                      id: data.body.id,
                      title: data.body.title,
                      vote_average: data.body.vote_average,
                      vote_count: data.body.vote_count,
                    }
                  }
                />
              </div>
              <div className="flex flex-col space-y-3">
                <div className="max-w-sm md:max-w-lg 2xl:max-w-5xl">
                  <span className="flex items-center space-x-2">
                    <HeaderText headingType="p">movie</HeaderText>
                    <CopyLink link={`https://tmrev.io${router.asPath}`} />
                  </span>
                  <h1 className="flex flex-wrap items-center text-3xl lg:text-6xl font-semibold">
                    <span className="mr-2">
                      {data.body.title}
                    </span>
                    <span className="text-lg lg:text-2xl dark:opacity-75 opacity-50">
                      (
                      {formatDate(data.body.release_date)}
                      )
                    </span>
                  </h1>
                  <p className="mt-8">{data.body.overview}</p>
                  <WatchedButton movie={data} />
                  <div className="w-full lg:hidden">
                    <CreateReviewButton hasReviewed={hasReviewed()} />
                    <AddToWatchList movie={data.body} />
                  </div>
                </div>
                <div className="divide-y mt-8 mb-40 md:flex flex-col">
                  <Crew cast={directors} title="Directors" />
                  <Crew cast={producers} title="Producers" />
                  <Crew cast={writers} title="Writers" />
                </div>
                <div className="!space-y-16 !mt-16 md:!mt-[7rem]">
                  <div className="block lg:hidden">
                    <HeaderText headingType="h2">Information</HeaderText>
                    <MetaData
                      ageRating={ageRating.length ? ageRating[0].certification : ''}
                      genres={data.body.genres}
                      imdb={data.body.imdb}
                      movie={data.body}
                      runtime={data.body.runtime}
                      tmdb={
                        {
                          id: data.body.id,
                          title: data.body.title,
                          vote_average: data.body.vote_average,
                          vote_count: data.body.vote_count,
                        }
                      }
                    />
                  </div>
                  <MovieReviewList reviews={data.body.tmrev.reviews} />
                  <MovieStats
                    isFetching={isFetching}
                    isLoading={isLoading}
                    tmrev={data.body.tmrev}
                  />
                  <MovieRevenue
                    dataSet="Weekend Box Office Performance"
                    id={parseMediaId(id as string)}
                    title={data.body.title}
                    year={data.body.release_date.split('-')[0]}
                  />
                </div>
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
