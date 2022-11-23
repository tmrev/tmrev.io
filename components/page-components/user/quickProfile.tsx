import Image from 'next/image';
import React, { FunctionComponent } from 'react';

import useProfile from '../../../hooks/userProfile';
import { extractNameFromEmail, renderImageSrc } from '../../../utils/common';
import UserNavigation from './userNavigation';

interface NumberIndicatorsProps {
  title: string
  number: number | string
}

const NumberIndicators = ({ title, number }: NumberIndicatorsProps) => (
  <div className="flex flex-col items-center">
    <p>{number}</p>
    <p className="opacity-70 tracking-tight md:tracking-wider">{title}</p>
  </div>
);

const QuickProfile:FunctionComponent = () => {
  const { data } = useProfile();

  if (!data) return null;

  return (
    <>
      <div className="flex flex-col w-full bg-black p-6">
        <div className="flex items-center space-x-4 ml-2 text-xs md:text-base w-full mt-8">
          <div className="relative h-16 w-16 flex-none">
            <Image className="rounded-full" layout="fill" objectFit="cover" src={renderImageSrc(data)} />
          </div>
          <div className="flex justify-evenly w-full">
            <NumberIndicators
              number={data.following.length}
              title="FOLLOWERS"
            />
            <NumberIndicators
              number={data.following.length}
              title="FOLLOWING"
            />
            <NumberIndicators
              number={data.reviews.length}
              title="REVIEWS"
            />
            <NumberIndicators
              number={data.watchLists.length}
              title="LISTS"
            />
          </div>
        </div>
        <div className="space-y-2 flex w-full mt-4 space-x-2 md:space-x-4 items-center">
          <div className="flex flex-col space-y-2">
            <h1 className="font-semibold text-sm md:text-2xl">{data.displayName || extractNameFromEmail(data.email)}</h1>
            <p className="text-sm md:text-base">{data.bio}</p>
            <div className="flex space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <span className="material-icons-outlined">
                  location_on
                </span>
                <p>{data.location}</p>
              </div>
              <a
                className="flex items-center space-x-1"
                href={data.link.url}
                rel="noreferrer"
                target="_blank"
              >
                <span className="material-icons-outlined">
                  language
                </span>
                <span className="text-blue-400 hover:underline">
                  {data.link.title}
                </span>
              </a>
            </div>
          </div>
        </div>

      </div>
      <UserNavigation />
    </>
  );
};

export default QuickProfile;
