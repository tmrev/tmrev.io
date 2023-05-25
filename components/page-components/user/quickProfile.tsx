import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FunctionComponent } from 'react';

import useProfile from '../../../hooks/userProfile';
import { useAuth } from '../../../provider/authUserContext';
import { useFollowUserMutation } from '../../../redux/api';
import { renderImageSrc } from '../../../utils/common';
import Button from '../../common/Button';
import CopyLink from '../movie/[id]/copyLink';
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
  const {
    data, isUser, userId, currentUser,
  } = useProfile();
  const { user } = useAuth();
  const router = useRouter();
  const [followUser] = useFollowUserMutation();

  const displayMessage = () => {
    if (!data) {
      return {
        path: '',
        title: '',
      };
    }

    if (isUser) {
      return {
        path: '/edit',
        title: 'Edit Profile',
      };
    }

    if (currentUser && currentUser.following?.includes(userId)) {
      return {
        path: '/unfollow',
        title: 'Unfollow',
      };
    }

    return {
      path: '/follow',
      title: 'Follow',
    };
  };

  const handleActionButton = async () => {
    if (!user || !currentUser) return;

    const authToken = await user.getIdToken();
    if (displayMessage().title !== 'Edit Profile') {
      followUser({ authToken, uid: userId });
    } else {
      router.push(`/user/${currentUser.uuid}/edit`);
    }
  };

  if (!data) return null;

  return (
    <>
      <div className="flex flex-col w-full bg-black p-6">
        <div className="flex items-center space-x-4 ml-2 text-xs md:text-base w-full mt-8">
          <div className="relative h-16 w-16 flex-none">
            <Image alt={`${data.firstName} ${data.lastName}`} className="rounded-full" layout="fill" objectFit="cover" src={renderImageSrc(data)} />
          </div>
          <div className="flex justify-evenly w-full">
            <NumberIndicators
              number={data.followers || 0}
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
            <div className="flex items-center space-x-2">
              <h1 className="font-semibold text-sm md:text-2xl">
                {data.firstName}
                {' '}
                {data.lastName}
              </h1>
              <CopyLink link={`https://tmrev.io${router.asPath}`} />
            </div>
            <p className="text-sm md:text-base">{data.bio}</p>
            <div className="flex space-x-4 text-xs">
              {!!data.location && (
                <div className="flex items-center space-x-1">
                  <span className="material-icons-outlined">
                    location_on
                  </span>
                  <p>{data.location}</p>
                </div>
              )}
              {!!data.link && (
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
              )}
            </div>
          </div>
        </div>
        <div className=" mt-4 w-full">
          <Button className="w-full" variant={isUser ? 'secondary' : 'primary'} onClick={handleActionButton}>
            {displayMessage().title}
          </Button>
        </div>
      </div>
      <UserNavigation />
    </>
  );
};

export default QuickProfile;
