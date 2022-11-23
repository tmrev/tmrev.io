import { NextPage } from 'next';
import React from 'react';

import MetaTags from '../../../../components/common/MetaTag';
import HeaderText from '../../../../components/common/typography/headerText';
import QuickProfile from '../../../../components/page-components/user/quickProfile';
import MoviePanel from '../../../../components/user/moviePanel';
import WatchListPanel from '../../../../components/user/watchListPanel';
import { useAppSelector } from '../../../../hooks';
import useProfile from '../../../../hooks/userProfile';
import { getRunningOperationPromises, getUser } from '../../../../redux/api';
import { wrapper } from '../../../../redux/store';
import { extractNameFromEmail, renderImageSrc } from '../../../../utils/common';

const UserProfile:NextPage = () => {
  const { data, userId } = useProfile();
  const { watchLists, sortedReviews } = useAppSelector((state) => state.userProfile);

  if (!data) return null;

  return (
    <div className="my-16 px-0 lg:my-0  text-white overflow-x-hidden w-full">
      <MetaTags
        description=""
        image={renderImageSrc(data)}
        title={`${data.displayName || extractNameFromEmail(data.email)} | Profile`}
        url={`/user/${userId}/preview`}
      />
      <QuickProfile />
      <div className="space-y-16 lg:px-8 px-4">
        <div>
          <HeaderText headingType="h2">Highest Rated Movies</HeaderText>
          <div className="grid grid-rows-1 grid-flow-col gap-4 overflow-x-scroll py-5">
            {
              sortedReviews.highest.map((movie) => (
                <MoviePanel key={movie._id} movie={movie} />
              ))
            }
          </div>
        </div>
        <div>
          <HeaderText headingType="h2">Lowest Rated Movies</HeaderText>
          <div className="grid grid-rows-1 grid-flow-col gap-4 overflow-x-scroll py-5">
            {
              sortedReviews.lowest.map((movie) => (
                <MoviePanel key={movie._id} movie={movie} />
              ))
            }
          </div>
        </div>
        <div>
          <HeaderText headingType="h2">Watchlists</HeaderText>
          <div className="grid grid-rows-1 grid-flow-col gap-4 overflow-x-scroll py-5">
            {
              watchLists.map((watchList) => (
                <WatchListPanel key={watchList._id} watchlist={watchList} />
              ))
            }
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
      store.dispatch(getUser.initiate({ uid: id }));
    }

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  },
);

export default UserProfile;
