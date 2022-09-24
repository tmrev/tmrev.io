import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { FunctionComponent, memo } from 'react';

import useProfile from '../../../../hooks/userProfile';
import { Movie } from '../../../../models/tmdb';
import { TmrevReview } from '../../../../models/tmrev';
import { Profile } from '../../../../models/tmrev/movie';
import { extractNameFromEmail } from '../../../../utils/common';
import imageUrl from '../../../../utils/imageUrl';

interface Props {
  review: TmrevReview
  profile: Profile | null
  movie: Movie
}

const UserReviews:FunctionComponent<Props> = ({ review, profile, movie }:Props) => {
  const { userId } = useProfile();
  const renderUserName = () => {
    if (!profile) return 'Error';
    if (!profile.firstName || !profile.lastName) {
      return (
        <Link passHref href={`/user/${userId}/preview`}>
          <a>{extractNameFromEmail(profile.email)}</a>
        </Link>
      );
    }

    return (
      <Link passHref href={`/user/${userId}/preview`}>
        <a>{`${profile.firstName} ${profile.lastName}`}</a>
      </Link>
    );
  };

  return (
    <div className="py-6">
      <div key={review._id} className="flex items-start justify-start space-x-4">
        <div className="rounded aspect-moviePoster relative h-64 w-max mx-4">
          <Image
            priority
            className="rounded"
            layout="fill"
            objectFit="contain"
            src={imageUrl(movie.poster_path || '', 300, true)}
          />
        </div>
        <div className="space-y-4">
          <div>
            <h1 className="font-semibold text-xl">
              {review.title}
            </h1>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-x-2">
            <div className="bg-tmrev-gray-dark rounded p-1 w-max">
              <p className="text-tmrev-alt-yellow font-bold tracking-widest text-lg uppercase">{review.averagedAdvancedScore}</p>
            </div>
            <p className="opacity-50">watched by</p>
            {renderUserName()}
            <p className="opacity-50">{dayjs(review.reviewedDate || review.createdAt.seconds * 1000).format('MMMM DD, YYYY')}</p>
          </div>
          <p className="hidden md:block max-w-xl">{review.notes}</p>
        </div>
      </div>
      <p className="block md:hidden max-w-xl py-4">{review.notes}</p>
    </div>
  );
};

export default memo(UserReviews);
