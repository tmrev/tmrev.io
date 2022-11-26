import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  FunctionComponent, memo,
} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { useAppSelector } from '../../../../hooks';
import useFirebaseAuth from '../../../../hooks/userAuth';
import { TmrevReview } from '../../../../models/tmrev';
import { extractNameFromEmail } from '../../../../utils/common';
import Button from '../../../common/Button';

interface Props {
  review: TmrevReview
}

const ReviewItem:FunctionComponent<Props> = ({ review }:Props) => {
  const {
    userId, _id, notes, averagedAdvancedScore, profile,
  } = review;
  const { user } = useFirebaseAuth();
  const { navigationOpen } = useAppSelector((state) => state.navigation);
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

  return (
    <div key={_id} className="flex items-start p-3 space-x-3">
      <div className="lg:h-16 lg:w-16 h-8 w-8 bg-white rounded-full relative">
        <Image
          alt={`${profile.firstName} ${profile.lastName}`}
          className="rounded-full"
          layout="fill"
          src={profile.photoUrl || `https://avatars.dicebear.com/api/identicon/${userId}.svg`}
        />
      </div>
      <div className={`
      max-w-xs md:max-w-sm 2xl:max-w-5xl
      ${navigationOpen && '2xl:!max-w-3xl md:!max-w-xs'} 
      space-y-4`}
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

        <div className="max-h-60 overflow-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {notes}
          </ReactMarkdown>
        </div>

        <p className="opacity-75">
          User Rating
          {' '}
          {averagedAdvancedScore}
        </p>
      </div>
    </div>
  );
};

export default memo(ReviewItem);
