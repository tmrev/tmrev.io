import { NextPage } from 'next';
import React from 'react';

import MetaTags from '@/components/common/MetaTag';
import HeaderText from '@/components/common/typography/headerText';
import QuickProfile from '@/components/page-components/user/quickProfile';
import CategoryBarChart from '@/components/user/categoryBarChart';
import MoviePanel from '@/components/user/moviePanel';
import WatchListPanel from '@/components/user/watchListPanel';
import { useAppSelector } from '@/hooks';
import useProfile from '@/hooks/userProfile';
import { TmrevReview } from '@/models/tmrev';
import { getRunningOperationPromises, getUser, useCategoryRatingsQuery } from '@/redux/api';
import { wrapper } from '@/redux/store';
import { extractNameFromEmail, renderImageSrc } from '@/utils/common';

interface Props {
  sortedReviews: {
    highest: TmrevReview[];
    lowest: TmrevReview[];
  }
}

const UserProfile: NextPage<Props> = ({sortedReviews} :Props) => {
  const { data, userId } = useProfile();
  const { watchLists } = useAppSelector(
    (state) => state.userProfile,
  );
  const { data: categoryRatings } = useCategoryRatingsQuery(userId, {skip: !userId})

  if (!data || !sortedReviews || !categoryRatings) return null;

  return (
    <div className="mb-16 px-0 lg:my-0  text-white overflow-x-hidden">
      <MetaTags
        description=""
        image={renderImageSrc(data)}
        title={`${
          data.displayName || extractNameFromEmail(data.email)
        } | Profile`}
        url={`/user/${userId}/preview`}
      />
      <QuickProfile />
      <div className="space-y-16 lg:px-8 px-4">
        <div>
          <HeaderText headingType="h2">Movie Ratings Distribution</HeaderText>
          <div className="grid grid-rows-1 grid-flow-col gap-4 overflow-x-scroll py-5">
            {Object.keys(categoryRatings.body.data).map((category) => (
              <CategoryBarChart 
                key={category} 
                category={category as any} 
                numberArray={(categoryRatings.body.data as any)[category]}  />
            ))}
          </div>
        </div>
        <div>
          <HeaderText headingType="h2">Highest Rated Movies</HeaderText>
          <div className="grid grid-rows-1 grid-flow-col gap-4 overflow-x-scroll py-5">
            {sortedReviews.highest.map((movie) => (
              <MoviePanel key={movie._id} movie={movie} />
            ))}
          </div>
        </div>
        <div>
          <HeaderText headingType="h2">Lowest Rated Movies</HeaderText>
          <div className="grid grid-rows-1 grid-flow-col gap-4 overflow-x-scroll py-5">
            {sortedReviews.lowest.map((movie) => (
              <MoviePanel key={movie._id} movie={movie} />
            ))}
          </div>
        </div>
        {watchLists.length && (
          <div>
            <HeaderText headingType="h2">Watchlists</HeaderText>
            <div className="grid grid-rows-1 grid-flow-col gap-4 overflow-x-scroll py-5">
              {watchLists.map((watchList) => (
                <WatchListPanel key={watchList._id} watchlist={watchList} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id;
    if (typeof id === 'string') {
      store.dispatch(getUser.initiate({ uid: id }));
    }

    const response = await fetch(`${process.env.TMREV_API}/user/${id}/ratedMovies`)

    const data = await response.json()

    await Promise.all(getRunningOperationPromises());

    return {
      props: {
        sortedReviews: data.body
      },
    };
  },
);

export default UserProfile;
