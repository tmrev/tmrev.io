import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import MetaTags from '../../../components/common/MetaTag';
import MoviePanel from '../../../components/user/moviePanel';
import WatchListPanel from '../../../components/user/watchListPanel';
import { useAuth } from '../../../provider/authUserContext';
import { useGetUserQuery } from '../../../redux/api';
import { extractNameFromEmail, renderImageSrc } from '../../../utils/common';

const UserProfile:NextPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const payload = useMemo(() => {
    if (typeof router.query.id === 'string') {
      return {
        uid: router.query.id,
      };
    }

    return {
      uid: '',
    };
  }, [router]);
  const { data } = useGetUserQuery(payload, { skip: !payload.uid });

  const isUser = useMemo(() => {
    if (!data || !user) return false;

    if (data.uuid === user.uid) return true;

    return false;
  }, [data, user]);

  const watchLists = useMemo(() => {
    if (!data) return [];

    return [...data.watchLists.filter((value) => {
      if (isUser) {
        return value;
      }

      return value.public === true;
    })];
  }, [isUser, data]);

  const reviews = useMemo(() => {
    if (!data) return [];

    return [...data.reviews.filter((value) => {
      if (isUser) {
        return value;
      }

      return value.public === true;
    })];
  }, [data, isUser]);

  const sortedRatedMovies = useMemo(() => {
    if (!data) {
      return {
        highestRated: [],
        lowestRated: [],
      };
    }

    // eslint-disable-next-line max-len
    const sortedReviews = reviews.sort((a, b) => (a.averagedAdvancedScore || 0) - (b.averagedAdvancedScore || 0));

    return {
      highestRated: sortedReviews.slice(-10).reverse(),
      lowestRated: sortedReviews.slice(0, 10),
    };
  }, [data, user, reviews]);

  if (!data) return null;

  return (
    <div className="my-16 px-0 lg:my-0  text-white">
      <MetaTags
        description=""
        image={renderImageSrc(data)}
        title={`${data.displayName || extractNameFromEmail(data.email)} | Profile`}
        url={`/user/${payload.uid}`}
      />
      <div className="flex items-center w-full space-x-4 bg-tmrev-gray-dark p-6">
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
      <div className="space-y-16 mt-16 lg:px-6 px-0">
        <div>
          <h2 className="text-tmrev-alt-yellow font-bold tracking-widest text-xl md:text-2xl">HIGHEST RATED MOVIES</h2>
          <div className="grid grid-rows-1 grid-flow-col gap-4 overflow-x-scroll py-5">
            {
              sortedRatedMovies.highestRated.map((movie) => (
                <MoviePanel key={movie._id} movie={movie} />
              ))
            }
          </div>
        </div>
        <div>
          <h2 className="text-tmrev-alt-yellow font-bold tracking-widest text-xl md:text-2xl">LOWEST RATED MOVIES</h2>
          <div className="grid grid-rows-1 grid-flow-col gap-4 overflow-x-scroll py-5">
            {
              sortedRatedMovies.lowestRated.map((movie) => (
                <MoviePanel key={movie._id} movie={movie} />
              ))
            }
          </div>
        </div>
        <div>
          <h2 className="text-tmrev-alt-yellow font-bold tracking-widest text-xl md:text-2xl">WATCHLISTS</h2>
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

export default UserProfile;
