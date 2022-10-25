import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import HeaderText from '../components/common/typography/headerText';
import InformationCard from '../components/page-components/home/informationCard';
import {
  useBatchMoviesQuery, useGetDiscoverMovieQuery, useGetJustReviewedQuery, useGetTopReviewedQuery,
} from '../redux/api';
import { numberShortHand } from '../utils/common';
import imageUrl from '../utils/imageUrl';
import { createMediaUrl } from '../utils/mediaID';

const Home: NextPage = () => {
  const router = useRouter();

  const { data } = useGetDiscoverMovieQuery({ page: 1 });

  const { data: topReviewedIds } = useGetTopReviewedQuery();
  const { data: justReviewed } = useGetJustReviewedQuery();

  const batchedIds = useMemo(() => {
    if (!topReviewedIds || !justReviewed || !topReviewedIds.body || !justReviewed.body) {
      return {
        just: [],
        top: [],
      };
    }

    const top = topReviewedIds?.body.map((v) => v._id);
    const just = justReviewed?.body.movies.map((v) => v.tmdbID);

    return {
      just,
      top,
    };
  }, [topReviewedIds, justReviewed]);

  // eslint-disable-next-line max-len
  const { data: topReviewed } = useBatchMoviesQuery(batchedIds.top, { skip: !batchedIds.top.length });
  // eslint-disable-next-line max-len
  const { data: justReviewedImages } = useBatchMoviesQuery(batchedIds.just, { skip: !batchedIds.just.length });

  useEffect(() => {
    router.prefetch('/register');

    if (topReviewed && topReviewed.body) {
      Object.values(topReviewed.body).forEach((v) => {
        router.prefetch(`/movie/${createMediaUrl(v.id, v.title)}`);
      });
    }

    if (justReviewed && justReviewed.body) {
      justReviewed.body.movies.forEach((v) => {
        router.prefetch(`/movie/${createMediaUrl(v.tmdbID, v.title)}`);
      });
    }
  }, [topReviewed, justReviewed]);

  return (
    <div className="px-4 lg:px-10 py-6">
      <div className="w-full relative bg-tmrev-gray-dark h-96 rounded">
        <Image
          className="rounded z-10 opacity-30"
          layout="fill"
          objectFit="cover"
          src={imageUrl(data?.results[0].backdrop_path || '')}
        />
        <div className=" absolute text-white z-20 w-full bottom-0 left-0 right-0 m-auto flex flex-col items-center justify-center space-y-2">
          <h1 className="font-bold text-3xl lg:text-6xl text-center">“ EVERYONE&apos;S A CRITIC ”</h1>
          <p className="font-light">- TheMovieReview</p>
        </div>
      </div>
      <div className="space-y-36 mt-16">
        <div className="flex items-center justify-center w-full">
          <Link
            className="bg-tmrev-alt-yellow uppercase py-2 px-10 rounded hover:bg-opacity-90"
            href="/register"
          >
            <p className=" font-semibold text-lg ">Get Started</p>
          </Link>
        </div>
        <div className="flex flex-col w-full">
          <div>
            <HeaderText>Top reviewed</HeaderText>
          </div>
          <div className="flex flex-wrap justify-start space-x-4 md:space-x-0 md:justify-between items-center overflow-hidden mt-8">
            {topReviewed && Object.keys(topReviewed.body).map((movie) => (
              <Link
                key={topReviewed.body[movie].id}
                className="relative m-4 md:m-0 rounded aspect-moviePoster h-[160px]  md:h-[280px]"
                href={`/movie/${createMediaUrl(topReviewed.body[movie].id, topReviewed.body[movie].title)}`}
              >
                <Image
                  alt={topReviewed.body[movie].title}
                  className="rounded"
                  layout="fill"
                  objectFit="cover"
                  src={imageUrl(topReviewed.body[movie].poster_path || '', 300)}
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center space-x-5">
            <HeaderText>Just reviewed</HeaderText>
            <p className="text-white font-light">
              {`${numberShortHand(justReviewed ? justReviewed.body.count : 0)} Movies Reviewed`}
            </p>
          </div>
          <div className="flex flex-wrap justify-start space-x-4 items-center overflow-hidden mt-8">
            {justReviewed && justReviewedImages && [...justReviewed.body.movies].map((movie) => (
              <Link
                key={movie._id}
                className="relative m-4 rounded aspect-moviePoster h-[111px]"
                href={`/movie/${createMediaUrl(movie.tmdbID, movie.title)}`}
              >
                <Image
                  alt={movie.title}
                  className="rounded"
                  layout="fill"
                  objectFit="cover"
                  src={imageUrl(justReviewedImages.body[movie.tmdbID].poster_path || '', 300)}
                />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <HeaderText>What we do</HeaderText>
          <div className="grid grid-cols-1  md:grid-cols-2 gap-4 mt-8">
            <InformationCard
              description="In a world driven by data,
            it seems like movie reviews have been left behind..."
              href="/welcome#review"
              icon="reviews"
              title="Unique Review System"
            />
            <InformationCard
              description="View in depth movie data on beautiful charts and graphs."
              href="/welcome#data-visualization"
              icon="analytics"
              title="Data Visualization"
            />
            <InformationCard
              description="Create your own personal list and share it with your friends."
              href="/welcome#list"
              icon="list"
              title="Lists"
            />
            <InformationCard
              description="Keep a list of every movie you&lsquo;ve seen to date."
              href="/welcome#watched"
              icon="visibility"
              title="Watched"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
