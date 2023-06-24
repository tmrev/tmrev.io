import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FunctionComponent, useMemo } from 'react';

import useProfile from '../../../hooks/userProfile';
import { useAuth } from '../../../provider/authUserContext';
import { useFollowUserMutation, useRetrieveFollowerQuery, useRetrieveFollowingQuery } from '../../../redux/api';
import { renderImageSrc } from '../../../utils/common';
import Button from '../../common/Button';
import CopyLink from '../movie/[id]/copyLink';
import UserNavigation from './userNavigation';

interface NumberIndicatorsProps {
  title: string
  number: number | string
  href: string
  currentPath: string
}

const NumberIndicators = ({ title, number, href, currentPath }: NumberIndicatorsProps) => (
  <Link passHref href={`${currentPath}${href}`}>
    <a className="flex flex-col items-center" >
      <p>{number}</p>
      <p className="opacity-70 tracking-tight md:tracking-wider">{title}</p> 
    </a>
  </Link>
);

const QuickProfile:FunctionComponent = () => {
  const {
    data, isUser, userId, currentUser,
  } = useProfile();
  const { user } = useAuth();
  const router = useRouter();
  const [followUser] = useFollowUserMutation();

  const accountId = useMemo(() => {
    if(!data) return ''

    return data._id
  }, [data])

  const {data: following } = useRetrieveFollowingQuery({accountId, page: 1, pageSize:10}, {skip: !accountId})
  const {data: followers} = useRetrieveFollowerQuery({accountId, page: 1, pageSize:10},{skip: !accountId})

  const currentPath = useMemo(() => `/user/${userId}`, [userId])

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

    if (currentUser && currentUser.following?.includes(data._id)) {
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
    if (!user || !currentUser || !data) return;

    const authToken = await user.getIdToken();
    if (displayMessage().title !== 'Edit Profile') {
      followUser({ authToken, uid: accountId });
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
            <Image 
              fill 
              alt={`${data.firstName} ${data.lastName}`} 
              className="rounded-full object-cover"
              src={renderImageSrc(data)} 
            />
          </div>
          <div className="flex justify-evenly w-full">
            <NumberIndicators
              currentPath={currentPath}
              href='/followers'
              number={followers?.body?.total || 0}
              title="FOLLOWERS"
            />
            <NumberIndicators
              currentPath={currentPath}
              href='/following'
              number={following?.body?.total || 0}
              title="FOLLOWING"
            />
            <NumberIndicators
              currentPath={currentPath}
              href='/reviews'
              number={data.reviews.length}
              title="REVIEWS"
            />
            <NumberIndicators
              currentPath={currentPath}
              href='/list'
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
