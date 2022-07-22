import Image from 'next/image';
import Link from 'next/link';
import React, {
  FunctionComponent, memo, useEffect, useState,
} from 'react';
import Skeleton from 'react-loading-skeleton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { useAppSelector } from '../../../hooks';
import { TmrevReview } from '../../../models/tmrev';
import { extractNameFromEmail } from '../../../utils/common';

interface Props {
  review: TmrevReview
}

interface User {
  email: string
  photoUrl?: string
  displayName?: string
}

const tmrevAPI = process.env.NEXT_PUBLIC_TMREV_API;

const ReviewItem:FunctionComponent<Props> = ({ review }:Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<User>();
  const {
    userId, _id, notes, averagedAdvancedScore,
  } = review;
  const { navigationOpen } = useAppSelector((state) => state.navigation);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${tmrevAPI}/user/${userId}`);
      const userData = await res.json() as User;
      setIsLoading(false);
      setData(userData);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const renderUserName = () => {
    if (isLoading) return <Skeleton />;
    if (!data) return 'Error';
    if (!data.displayName) {
      return (
        <Link passHref href={`/user/${userId}`}>
          <a>{extractNameFromEmail(data.email)}</a>
        </Link>
      );
    }

    return (
      <Link passHref href={`/user/${userId}`}>
        <a>{data.displayName}</a>
      </Link>
    );
  };

  return (
    <div key={_id} className="flex items-start p-3 space-x-3">
      <div className="lg:h-16 lg:w-16 h-8 w-8 bg-white rounded-full relative">
        <Image
          className="rounded-full"
          layout="fill"
          src={`https://avatars.dicebear.com/api/identicon/${userId}.svg`}
        />
      </div>
      <div className={`
      max-w-xs md:max-w-sm 2xl:max-w-5xl
      ${navigationOpen && '2xl:!max-w-3xl md:!max-w-xs'} 
      space-y-4`}
      >
        <p className="font-semibold max-w-[350px] min-w-[200px]">
          <span className="font-normal opacity-75">Reviewed by</span>
          {' '}
          {renderUserName()}
        </p>
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
