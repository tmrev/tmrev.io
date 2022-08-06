import { NextPage } from 'next';
import React from 'react';

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
      <h2 className="text-tmrev-alt-yellow font-bold tracking-widest text-xl md:text-2xl">
        {`${renderName()} | WATCHLISTS`}
      </h2>
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
