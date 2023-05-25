import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';

import { NoImage } from '@/constants';

import { Movie } from '../../../../models/tmdb';
import { TmrevReview } from '../../../../models/tmrev';
import { Profile } from '../../../../models/tmrev/movie';
import { extractNameFromEmail } from '../../../../utils/common';
import imageUrl from '../../../../utils/imageUrl';
import { createMediaUrl } from '../../../../utils/mediaID';

interface Props {
  review: TmrevReview
  profile: Profile | null
  movie: Movie | undefined
  userId: string
}

const renderUserName = (profile: Profile | null, userId: string) => {
  if (!profile) return null;
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

const UserReviews:FunctionComponent<Props> = ({ review, profile, movie, userId }:Props) => (
  <div>
    <div key={review._id} className="flex items-start justify-start space-x-4">
      <Link passHref href={`/movie/${createMediaUrl(review.tmdbID, review.title)}`}>
        <a>
          <div className="rounded aspect-moviePoster relative h-64 w-max mx-4">
            <Image
              priority
              alt={`${review.title} poster`}
              className="rounded"
              layout="fill"
              objectFit="contain"
              src={movie?.poster_path ? imageUrl(movie.poster_path || '', 300, true) : NoImage}
            />
          </div>
        </a>
      </Link>
      <div className="space-y-4">
        <div>
          <Link passHref href={`/movie/${createMediaUrl(review.tmdbID, review.title)}`}>
            <a>
              <h1 className="font-semibold text-xl">
                {review.title}
              </h1>
            </a>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-x-2">
          <div className="bg-tmrev-gray-dark rounded p-1 w-max">
            <p className="text-tmrev-alt-yellow font-bold tracking-widest text-lg uppercase">{review.averagedAdvancedScore}</p>
          </div>
          <p className="opacity-50">watched by</p>
          {renderUserName(profile, userId)}
          <p className="opacity-50">{dayjs(review.reviewedDate || review.createdAt.seconds * 1000).format('MMMM DD, YYYY')}</p>
        </div>
        <p className="hidden md:block max-w-xl">{review.notes}</p>
      </div>
    </div>
    <p className="block md:hidden max-w-xl py-4">{review.notes}</p>
  </div>
)
;

export default UserReviews;
