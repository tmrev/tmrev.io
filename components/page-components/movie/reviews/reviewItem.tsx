import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  FunctionComponent, memo, useState,
} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import useFirebaseAuth from '../../../../hooks/userAuth';
import { TmrevReview } from '../../../../models/tmrev';
import { capitalize, extractNameFromEmail } from '../../../../utils/common';
import Button from '../../../common/Button';

interface Props {
  review: TmrevReview | null
}

const ReviewItem:FunctionComponent<Props> = ({ review }:Props) => {
  const [viewMore, setViewMore] = useState<boolean>(false);
  if (!review) return null;
  const {
    userId, _id, notes, averagedAdvancedScore, profile,
  } = review;
  const { user } = useFirebaseAuth();
  const router = useRouter();

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
          className=" bg-tmrev-gray-dark p-2 rounded"
          type="button"
          onClick={() => setViewMore(!viewMore)}
        >
          View
          {' '}
          {`${viewMore ? 'Less' : 'Additional'}`}
          {' '}
          Ratings
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

  return (
    <div key={_id} className="flex items-start p-3 space-x-3">
      <div className="lg:h-16 lg:w-16 h-8 w-8 bg-white rounded-full flex-none relative">
        <Image
          alt={`${profile.firstName} ${profile.lastName}`}
          className="rounded-full"
          layout="fill"
          src={profile.photoUrl || `https://avatars.dicebear.com/api/identicon/${userId}.svg`}
        />
      </div>
      <div
        className="w-full space-y-4"
      >
        <div className="flex space-x-4 items-center">
          <p className="font-semibold max-w-[350px] min-w-[200px]">
            <span className="font-normal opacity-75">Reviewed by</span>
            {' '}
            {renderUserName()}
          </p>
          {user?.uid === userId && (
            <Button title="edit" variant="icon" onClick={() => router.push(`${router.asPath}/update/${_id}`)}>
              <span className="material-icons">
                edit
              </span>
            </Button>
          )}
        </div>

        <div className="max-h-60 overflow-auto w-full">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {notes}
          </ReactMarkdown>
        </div>

        <p className="opacity-75">
          User Rating
          {' '}
          {averagedAdvancedScore}
        </p>
        {renderViewMore()}
      </div>
    </div>
  );
};

export default memo(ReviewItem);
