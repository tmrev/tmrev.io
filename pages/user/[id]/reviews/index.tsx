import { NextPage } from 'next';
import React, { useEffect, useMemo, useState } from 'react';

import Spinner from '@/components/common/spinner';
import QuickProfile from '@/components/page-components/user/quickProfile';
import UserReviews from '@/components/page-components/user/reviews/userReviews';
import { useAppSelector } from '@/hooks';
import useProfile from '@/hooks/userProfile';
import useScroll from '@/hooks/useScroll';
import {
  getRunningQueriesThunk,
  getUser,
  useBatchMoviesQuery,
} from '@/redux/api';
import { wrapper } from '@/redux/store';

interface Props {}

const loadLimit = 25

const Reviews: NextPage<Props> = () => {
  const { data, userId } = useProfile();
  const { isBottom } = useScroll()
  const [loadAmount, setLoadAmount] = useState<number>(loadLimit)
  const { reviews } = useAppSelector((state) => state.userProfile);

  const movieIds = useMemo(() => {
    if (!reviews) return [];

    return reviews.map((review) => review.tmdbID);
  }, [reviews]);

  const { data: movies } = useBatchMoviesQuery(movieIds, {
    skip: !movieIds.length,
  });

  useEffect(() => {
    if(isBottom){
      setLoadAmount(loadAmount + loadLimit)
    }

  }, [isBottom])

  return (
    <div className="mb-16 px-0 lg:my-0 text-white w-full">
      <QuickProfile />
      {!data || !movies ? (
        <div className='flex items-center justify-center w-full pb-4'>
          <Spinner/>
        </div>
      ) : (
        <div className='space-y-3'>
          {reviews.slice(0, loadAmount).map((review) => (
            <UserReviews
              key={review._id}
              movie={movies.body[review.tmdbID]}
              profile={review.profile}
              review={review}
              userId={userId}
            />
          ))}
          <div className='flex items-center justify-center w-full pb-4'>
            <button type='button' onClick={() => setLoadAmount(loadAmount + loadLimit)} >View More</button>
          </div>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id;
    if (typeof id === 'string') {
      store.dispatch(getUser.initiate({ uid: id }));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  },
);

export default Reviews;
