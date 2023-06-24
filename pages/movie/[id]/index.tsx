/* eslint-disable @typescript-eslint/no-unused-vars */
import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import MetaTags from '@/components/common/MetaTag';
import HeaderText from '@/components/common/typography/headerText';
import NewsContainer from '@/components/news/newsContainer';
import AddToWatchList from '@/components/page-components/movie/[id]/addToWatchListButton';
import CopyLink from '@/components/page-components/movie/[id]/copyLink';
import CreateReviewButton from '@/components/page-components/movie/[id]/createReviewButton';
import MovieDescription from '@/components/page-components/movie/[id]/movieDescription';
import MovieRevenue from '@/components/page-components/movie/[id]/movieRevenue';
import MovieStats from '@/components/page-components/movie/[id]/movieStats';
import MovieReviewList from '@/components/page-components/movie/reviews/reviewList';
import WatchedButton from '@/components/page-components/movie/watched/watchedButton';
import { firebaseAdmin } from '@/config/firebaseAdmin';
import useFirebaseAuth from '@/hooks/userAuth';
import { MovieQuery } from '@/models/tmdb';
import { MovieReviewPayload, MovieReviewQuery } from '@/models/tmdb/movie';
import tmrevIco from '@/public/tmrlogo.svg';
import {
  getAllReviews,
  getMovie,
  getRunningQueriesThunk,
  useGetAllReviewsQuery,
  useGetMovieQuery,
} from '@/redux/api';
import { wrapper } from '@/redux/store';
import { numberShortHand, roundWithMaxPrecision } from '@/utils/common';
import formatDate from '@/utils/formatDate';
import imageUrl from '@/utils/imageUrl';
import { createMediaUrl, parseMediaId } from '@/utils/mediaID';

interface Props { }

const MoviePage: NextPage<Props> = () => {
  const router = useRouter();
  const { user } = useFirebaseAuth();

  const { id } = router.query;

  // eslint-disable-next-line no-unused-vars
  const [query, setQuery] = useState<MovieReviewQuery>();

  useEffect(() => {
    if(!user) return

    setQuery(
      {
        include_user_review: user.uid,
        sort_by: 'reviewedDate.desc',
      }
    )
  }, [user])

  const payload: MovieQuery | null = useMemo(() => {
    if (typeof id === 'string') {
      return {
        movie_id: parseMediaId(id),
      };
    }

    return null;
  }, []);

  const movieReviewPayload: MovieReviewPayload | null = useMemo(() => {
    if (typeof id === 'string') {
      return {
        movie_id: parseMediaId(id),
        query,
      };
    }

    return null;
  }, [query]);

  const { data, isLoading, isFetching } = useGetMovieQuery(
    payload || skipToken,
    { skip: router.isFallback },
  );
  const { data: reviewData } = useGetAllReviewsQuery(
    movieReviewPayload || skipToken,
    { skip: router.isFallback },
  );

  const ageRating = useMemo(() => {
    if (!data) return [];

    const result = data.body.release_dates.results.find(
      (dataResults) => dataResults.iso_3166_1 === 'US',
    );

    if (!result) return [];

    return result.release_dates;
  }, [data]);

  const hasReviewed = useCallback(() => {
    if (!user || !reviewData || !reviewData.body.reviews.length) return '';

    let reviewId = '';

    reviewData.body.reviews.forEach((review) => {
      if (review.userId === user.uid) reviewId = review._id;
    });

    return reviewId;
  }, [user, data]);

  if (!data || !reviewData) return null;

  return (
    <>
      <MetaTags
        description={data.body.overview}
        image={imageUrl(data.body.poster_path || '', 400, true)}
        largeImage={imageUrl(data.body.backdrop_path || '')}
        title={data.body.title}
        url={createMediaUrl(data.body.id, data.body.title)}
      />
      <div className="relative flex flex-col justify-center items-center">
        <div className="relative w-full h-96 lg:h-[500px]">
          <Image
            fill
            priority
            alt={`${data.body.title} backdrop`}
            className='object-cover'
            src={imageUrl(data.body.backdrop_path)}
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-blacker h-[101%] w-full" />
        </div>
        <div className="px-4 lg:px-8 mb-6 mt-0 lg:-mt-16">
          <div
            className={clsx(
              'p-0 md:p-8 flex w-full lg:max-w-5xl',
              'rounded',
              'lg:bg-gradient-to-b to-blacker from-black',
            )}
          >
            <div className="flex text-white">
              <div className="hidden flex-shrink-0 lg:flex lg:flex-col mr-8">
                <Image
                  priority
                  alt={`${data.body.title} poster`}
                  className="rounded aspect-[2/3] object-cover"
                  height={500}
                  src={imageUrl(data.body.poster_path || '', 400, true)}
                  width={350}
                />
                <CreateReviewButton hasReviewed={hasReviewed()} />
                <AddToWatchList movie={data.body} />
              </div>
              <div className="flex flex-col space-y-3">
                <div className=" lg:mt-12">
                  <span className="flex items-center space-x-2">
                    <HeaderText headingType="p">movie</HeaderText>
                    <CopyLink link={`https://tmrev.io${router.asPath}`} />
                    <CreateReviewButton iconButton hasReviewed={hasReviewed()} />
                  </span>
                  <div className='space-y-3'>
                    <h1 className="flex flex-wrap items-center text-3xl lg:text-6xl font-semibold">
                      <span className="mr-2">{data.body.title}</span>
                      <span className="text-lg lg:text-2xl dark:opacity-75 opacity-50">
                      ({formatDate(data.body.release_date)})
                      </span>
                    </h1>
                    {reviewData.body.avgScore && (
                      <div className='bg-black rounded p-1 flex items-center space-x-3 w-full'>
                        <Image
                          alt='TMREV'
                          className='flex-shrink-0'
                          height={32}
                          src={tmrevIco}
                          width={32}
                        />
                        <div className='space-x-1'>
                          <span className='font-bold text-2xl' >{roundWithMaxPrecision(reviewData.body.avgScore?.totalScore, 1)}</span> 
                          <span className='font-light text-sm' >/</span>
                          <span className='font-light text-sm'>10</span>
                        </div>
                        <span className='text-xs opacity-50' >({numberShortHand(reviewData.body.total)})</span>
                      </div>
                    )}

                    <WatchedButton movie={data} review={reviewData} />
                    <MovieDescription
                      ageRating={
                        ageRating.length ? ageRating[0].certification : ''
                      }
                      genres={data.body.genres}
                      imdb={data.body.imdb}
                      movie={data.body}
                      overview={data.body.overview}
                      runtime={data.body.runtime}
                      tmdb={{
                        id: data.body.id,
                        title: data.body.title,
                        vote_average: data.body.vote_average,
                        vote_count: data.body.vote_count,
                      }}
                    />
                  </div>
                  <div className="w-full lg:hidden">
                    <CreateReviewButton hasReviewed={hasReviewed()} />
                    <AddToWatchList movie={data.body} />
                  </div>
                </div>
                <div className=" space-y-3">
                  <MovieReviewList
                    reviews={reviewData.body.reviews}
                    // setQuery={setQuery}
                    // total={reviewData.body.total}
                  />
                  <MovieStats
                    isFetching={isFetching}
                    isLoading={isLoading}
                    tmrev={reviewData}
                  />

                  <MovieRevenue
                    dataSet="Weekend Box Office Performance"
                    id={parseMediaId(id as string)}
                    title={data.body.title}
                    year={data.body.release_date.split('-')[0]}
                  />
                  <NewsContainer movieTitle={data.body.title} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    try {
      const { token } = nookies.get(context);
      let user: any;
  
      if (token) {
        user = await firebaseAdmin.auth().verifyIdToken(token);
      }
  
      const id = context.params?.id;
  
      if (typeof id === 'string' && token && user) {
        store.dispatch(getMovie.initiate({ movie_id: parseMediaId(id) }));
        store.dispatch(
          getAllReviews.initiate({
            movie_id: parseMediaId(id),
            query: {
              count: 10,
              include_user_review: user.uid,
              sort_by: 'reviewedDate.desc',
            },
          }),
        );
      } else if (typeof id === 'string') {
        store.dispatch(getMovie.initiate({ movie_id: parseMediaId(id) }));
        store.dispatch(
          getAllReviews.initiate({
            movie_id: parseMediaId(id),
            query: {
              count: 1,
              sort_by: 'reviewedDate.desc',
            },
          }),
        );
      }
  
      await Promise.all(store.dispatch(getRunningQueriesThunk()));
  
      return {
        props: {},
      };
    } catch (error) {
      return {
        props: {},
        redirect: {
          destination: '/login'
        }
      }
    }

  },
);

export default MoviePage;
