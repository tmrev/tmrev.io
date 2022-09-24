import { NextPage } from 'next';
import React from 'react';

import MetaTags from '../../../../components/common/MetaTag';
import QuickProfile from '../../../../components/page-components/user/quickProfile';
import WatchListPanel from '../../../../components/user/watchListPanel';
import { useAuth } from '../../../../provider/authUserContext';
import { useGetUserQuery } from '../../../../redux/api';
import { extractNameFromEmail } from '../../../../utils/common';

const WatchList:NextPage = () => {
  const { user } = useAuth();

  const { data } = useGetUserQuery({ uid: user?.uid || '' }, { skip: !user });

  if (!data) return null;

  return (
    <div className="my-16 px-0 lg:my-0 text-white">
      <MetaTags
        description=""
        title={`${data.displayName || extractNameFromEmail(data.email)} | WatchLists`}
        url="/watch-lists"
      />
      <QuickProfile />
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
