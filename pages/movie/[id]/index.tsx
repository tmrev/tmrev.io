/* eslint-disable @typescript-eslint/no-unused-vars */
import { skipToken } from '@reduxjs/toolkit/query';
import clsx from 'clsx';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
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
import useFirebaseAuth from '@/hooks/userAuth';
import { MovieReviewPayload, MovieReviewQuery } from '@/models/tmdb/movie';
import { MovieGeneral } from '@/models/tmdb/movie/tmdbMovie';
import tmrevIco from '@/public/tmrlogo.svg';
import {
  useGetAllReviewsQuery,
} from '@/redux/api';
import { numberShortHand, roundWithMaxPrecision } from '@/utils/common';
import formatDate from '@/utils/formatDate';
import imageUrl from '@/utils/imageUrl';
import { createMediaUrl, parseMediaId } from '@/utils/mediaID';

interface Props {
  movie?: MovieGeneral
}

const MoviePage: NextPage<Props> = ({movie}: Props) => {
  const router = useRouter();
  const { user, tmrevUser } = useFirebaseAuth();

  const { id } = router.query;

  // eslint-disable-next-line no-unused-vars
  const [query, setQuery] = useState<MovieReviewQuery>();

  useEffect(() => {
    if(!user) return

    setQuery(
      {
        sort_by: 'reviewedDate.desc',
      }
    )
  }, [user])


  const movieReviewPayload: MovieReviewPayload | null = useMemo(() => {
    if (typeof id === 'string') {
      return {
        movie_id: parseMediaId(id),
        query,
      };
    }

    return null;
  }, [query]);

  const { data: reviewData, isLoading, isFetching } = useGetAllReviewsQuery(
    movieReviewPayload || skipToken,
    { skip: router.isFallback },
  );

  const hasReviewed = useCallback(() => {
    if (!tmrevUser || !reviewData) return '';

    let reviewId = '';

    reviewData.body.reviews.forEach((review) => {
      if (review.user === tmrevUser._id) reviewId = review._id;
    });

    return reviewId;
  }, [tmrevUser, reviewData]);


  if(!movie) return null

  return (
    <>
      <MetaTags
        description={movie.overview}
        image={imageUrl(movie.poster_path || '', 400, true)}
        largeImage={imageUrl(movie.backdrop_path || '')}
        title={movie.title}
        url={createMediaUrl(movie.id, movie.title)}
      />
      <div className="relative flex flex-col justify-center items-center">
        <div className="relative w-full h-96 lg:h-[500px]">
          <Image
            fill
            priority
            alt={`${movie.title} backdrop`}
            className='object-cover'
            src={imageUrl(movie.backdrop_path || '')}
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
                  alt={`${movie.title} poster`}
                  className="rounded aspect-[2/3] object-cover"
                  height={500}
                  src={imageUrl(movie.poster_path || '', 400, true)}
                  width={350}
                />
                <CreateReviewButton hasReviewed={hasReviewed()} />
                <AddToWatchList movie={movie} />
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
                      <span className="mr-2">{movie.title}</span>
                      <span className="text-lg lg:text-2xl dark:opacity-75 opacity-50">
                      ({formatDate(movie.release_date)})
                      </span>
                    </h1>
                    {reviewData && reviewData.body.avgScore && (
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

                    {reviewData && (
                      <WatchedButton movie={movie} review={reviewData} />
                    )}
                 
                    <MovieDescription movie={movie} />
                  </div>
                  <div className="w-full lg:hidden">
                    <CreateReviewButton hasReviewed={hasReviewed()} />
                    <AddToWatchList movie={movie} />
                  </div>
                </div>
                <div className=" space-y-3">
                  {reviewData && (
                    <>
                      <MovieReviewList
                        reviews={reviewData.body.reviews}
                      />
                      <MovieStats
                        isFetching={isFetching}
                        isLoading={isLoading}
                        tmrev={reviewData}
                      />
                    </>
                  )}
                  <MovieRevenue
                    dataSet="Weekend Box Office Performance"
                    id={parseMediaId(id as string)}
                    title={movie.title}
                    year={movie.release_date.split('-')[0]}
                  />
                  <NewsContainer movieTitle={movie.title} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

MoviePage.defaultProps = {
  movie: undefined
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  try {
    const { id } = context.query

    const fetchMovie = await fetch(`${process.env.TMDB_API_URL}/movie/${parseMediaId(id?.toString())}?api_key=${process.env.TMDB_API_KEY}`)

    const movieData: MovieGeneral = await fetchMovie.json()

    return {
      props: {
        movie: movieData
      },
    };
  } catch (error) {
    return {
      props: {
        movie: undefined
      },
      redirect: {
        destination: '/'
      }
    }
  }
}

export default MoviePage;
