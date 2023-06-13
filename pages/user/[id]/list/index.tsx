import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import OutlineButton from '@/components/button/outline';
import MetaTags from '@/components/common/MetaTag';
import QuickProfile from '@/components/page-components/user/quickProfile';
import WatchListPanel from '@/components/user/watchListPanel';
import { useAuth } from '@/provider/authUserContext';
import { useGetUserQuery } from '@/redux/api';
import { extractNameFromEmail } from '@/utils/common';

const WatchList: NextPage = () => {
  const { user } = useAuth();

  const router = useRouter();

  const { data } = useGetUserQuery(
    { uid: (router.query.id as string) || '' },
    { skip: !user },
  );

  if (!data) return null;

  return (
    <div className="my-16 px-0 lg:my-0 text-white w-full">
      <MetaTags
        description=""
        title={`${
          data.displayName || extractNameFromEmail(data.email)
        } | WatchLists`}
        url="/watch-lists"
      />
      <QuickProfile />
      <div className="px-4">
        <OutlineButton className="w-full" onClick={() => router.push(`${router.asPath}/create`)}>
          Create List
        </OutlineButton>
        <div className="flex flex-col space-y-4 mt-4">
          {data.watchLists.length ? (
            data.watchLists.map((watchList) => (
              <WatchListPanel key={watchList._id} watchlist={watchList} />
            ))
          ) : (
            <p className="w-full text-center border p-6 rounded">
              No List Created
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchList;
