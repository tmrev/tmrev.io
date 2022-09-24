import Image from 'next/image';
import React, { FunctionComponent } from 'react';

import { useAppSelector } from '../../../hooks';
import useProfile from '../../../hooks/userProfile';
import { extractNameFromEmail, renderImageSrc } from '../../../utils/common';
import UserNavigation from './userNavigation';

const QuickProfile:FunctionComponent = () => {
  const { data } = useProfile();
  const { reviews, watchLists } = useAppSelector((state) => state.userProfile);

  if (!data) return null;

  return (
    <>
      <div className="flex items-center w-full space-x-4 bg-tmrev-gray-dark p-6 sticky top-0 left-0 right-0">
        <div className="relative h-16 w-16">
          <Image className="rounded-full" layout="fill" objectFit="cover" src={renderImageSrc(data)} />
        </div>
        <div>
          <h1 className="font-semibold text-2xl">{data.displayName || extractNameFromEmail(data.email)}</h1>
          <span className="flex space-x-4 opacity-70">
            <p>
              {`Reviews | ${reviews.length}`}
            </p>
            <p>
              {`WatchList | ${watchLists.length}`}
            </p>
          </span>
        </div>
      </div>
      <UserNavigation />
    </>
  );
};

export default QuickProfile;
