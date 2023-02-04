import { NextPage } from 'next';
import React from 'react';

import Button from '../../../../components/common/Button';
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
    <div className="my-16 px-0 lg:my-0 text-white w-full">
      <MetaTags
        description=""
        title={`${data.displayName || extractNameFromEmail(data.email)} | WatchLists`}
        url="/watch-lists"
      />
      <QuickProfile />
      <div className="px-4">
        <Button className="w-full" variant="primary">Create List</Button>
        <div className="flex flex-col space-y-4 mt-4">
          {data.watchLists.map((watchList) => (
            <WatchListPanel key={watchList._id} watchlist={watchList} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchList;
