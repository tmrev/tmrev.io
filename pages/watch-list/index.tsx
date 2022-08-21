import { NextPage } from 'next';
import React from 'react';

import MetaTags from '../../components/common/MetaTag';
import HeaderText from '../../components/common/typography/headerText';
import WatchListPanel from '../../components/user/watchListPanel';
import { useAuth } from '../../provider/authUserContext';
import { useGetUserQuery } from '../../redux/api';
import { extractNameFromEmail } from '../../utils/common';

const WatchList:NextPage = () => {
  const { user } = useAuth();

  const { data } = useGetUserQuery({ uid: user?.uid || '' }, { skip: !user });

  const renderName = () => {
    if (!user) return null;

    if (user?.displayName) {
      return user?.displayName?.toUpperCase();
    }

    return extractNameFromEmail(user?.email).toUpperCase();
  };

  if (!data) return null;

  return (
    <div className=" px-8 mt-16">
      <MetaTags
        description=""
        title={`${data.displayName || extractNameFromEmail(data.email)} | WatchLists`}
        url="/watch-lists"
      />
      <HeaderText headingType="h2">
        {`${renderName()} | WATCHLISTS`}
      </HeaderText>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 items-start mt-4">
        {data.watchLists.map((watchList) => (
          <div key={watchList._id} className="flex justify-center">
            <WatchListPanel watchlist={watchList} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
