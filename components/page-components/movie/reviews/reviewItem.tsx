import Image from 'next/image';
import Link from 'next/link';
import React, {
  FunctionComponent, memo, useState,
} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { TmrevReview } from '../../../../models/tmrev';
import { capitalize, extractNameFromEmail } from '../../../../utils/common';

interface Props {
  review: TmrevReview | null
  compact?: boolean
}

const ReviewItem:FunctionComponent<Props> = ({ review, compact }:Props) => {
  const [viewMore, setViewMore] = useState<boolean>(false);
  if (!review) return null;
  const {
    userId, _id, notes, averagedAdvancedScore, profile,
  } = review;

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

  const renderViewMore = () => {
    if (!review.advancedScore) return null;

    return (
      <div className="space-y-4">
        <button
          className="text-white hover:underline"
          type="button"
          onClick={() => setViewMore(!viewMore)}
        >
          See
          {' '}
          {`${viewMore ? 'Less' : 'More'}`}
        </button>
        { viewMore && (
          <ul>
            {Object.keys(review.advancedScore).map((key: string) => {
              if (!review.advancedScore) return null;

              return <li key={key}>{`${capitalize(key)}: ${(review.advancedScore as any)[key]}`}</li>;
            })}
          </ul>
        )}
      </div>

    );
  };

  if(compact) {
    return (
      <div className='flex items-center space-x-3'>
        <div className="h-8 w-8 bg-white rounded-full flex-none relative">
          <Image
            alt={`${profile.firstName} ${profile.lastName}`}
            className="rounded-full"
            layout="fill"
            src={profile.photoUrl || `https://avatars.dicebear.com/api/identicon/${userId}.svg`}
          />
        </div>
        {review.notes ? (
          <div>
            <p className='line-clamp-1'>{review.notes}</p>
          </div>
        ): (
          <div className="flex items-center divide-x">
            <p className="font-semibold pr-1">
              {renderUserName()}
            </p>
            <p className="opacity-75 pl-1">
          User Rating
              {' '}
              {averagedAdvancedScore}
            </p>
          </div>
        )}

      </div>
    )
  }

  return (
    <div key={_id} className="flex items-start space-x-3">
      <div className="h-8 w-8 bg-white rounded-full flex-none relative">
        <Image
          alt={`${profile.firstName} ${profile.lastName}`}
          className="rounded-full"
          layout="fill"
          src={profile.photoUrl || `https://avatars.dicebear.com/api/identicon/${userId}.svg`}
        />
      </div>
      <div
        className="w-full"
      >
        <div className="flex items-center divide-x">
          <p className="font-semibold pr-1">
            {renderUserName()}
          </p>
          <p className="opacity-75 pl-1">
          User Rating
            {' '}
            {averagedAdvancedScore}
          </p>
        </div>
        <div className="max-h-60 overflow-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {notes}
          </ReactMarkdown>
        </div>
        <div className='mt-3'>
          {renderViewMore()}
        </div>
      </div>
    </div>
  );
};

ReviewItem.defaultProps = {
  compact: false
}

export default memo(ReviewItem);
