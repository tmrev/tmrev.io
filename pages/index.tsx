import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import NewsCard from '@/components/card/newsCard';
import HorizontalItems from "@/components/common/Horizontaltems";
import MetaTags from '@/components/common/MetaTag';
import HeaderText from '@/components/common/typography/headerText';
import IntroHeader from '@/components/intro-header';
import InformationCard from '@/components/page-components/home/informationCard';
import { useAuth } from '@/provider/authUserContext';
import {
  useBatchMoviesQuery,
  useGetJustReviewedQuery,
  useGetTopReviewedQuery,
} from '@/redux/api';
import { useTrendingQuery } from '@/redux/api/news';
import { numberShortHand } from '@/utils/common';
import { createMediaUrl } from '@/utils/mediaID';

const Home: NextPage = () => {
  const router = useRouter();
  const { user } = useAuth()

  const { data: topReviewedIds } = useGetTopReviewedQuery();
  const { data: justReviewed } = useGetJustReviewedQuery();
  const {data: trendingNews} = useTrendingQuery({limit: 50})

  const batchedIds = useMemo(() => {
    if (
      !topReviewedIds
            || !justReviewed
            || !topReviewedIds.body
            || !justReviewed.body
    ) {
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
  const { data: topReviewed } = useBatchMoviesQuery(batchedIds.top, {
    skip: !batchedIds.top.length,
  });

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
    <div className="pb-6">
      <MetaTags
        description="An in-depth analysis of the latest movies, movies you would like to see, or movies that simply blew you away."
        title="The Movie Review"
        url="https://tmrev.io"
      />
      <div className='flex flex-col'>
        <IntroHeader/>
        {!user && (
          <div className="flex items-center justify-center w-full mt-5 ">
            <Link passHref href="/register">
              <a className="bg-tmrev-alt-yellow uppercase py-2 px-10 rounded">
                <p className=" font-semibold text-lg ">Start Reviewing</p>
              </a>
            </Link>
          </div>
        )}
      </div>
      <div className="space-y-24 mt-16 px-4">
        <div>
          <div>
            <HeaderText>Top reviewed</HeaderText>
          </div>
          <HorizontalItems
            batchedIds={batchedIds}
            content={topReviewed}
          />
        </div>
        <div>
          <div className="flex items-center space-x-3">
            <HeaderText headingType="h2">Just reviewed</HeaderText>
            <p className="text-white font-light">
              {`${numberShortHand(
                justReviewed ? justReviewed.body.count : 0,
              )} Movies Reviewed`}
            </p>
          </div>
          <HorizontalItems
            batchedIds={batchedIds}
            content={justReviewed}
          />
        </div>
        <div>
          <div>
            <HeaderText headingType='h2'>Trending News</HeaderText>
          </div>
          <div className="grid grid-rows-1 grid-flow-col gap-3 overflow-x-auto pb-3 mt-8 snap-x-mandatory">
            {trendingNews?.body.map((news) => {
              if (!news.url) return null;
              return (
                <div key={news.url} className="scroll-snap-align-start h-full">
                  <NewsCard news={news} />
                </div>
              );
            })}
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
