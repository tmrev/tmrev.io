import { NextPage } from 'next';
import React, { useMemo } from 'react';

import Spinner from '../../../../components/common/spinner';
import QuickProfile from '../../../../components/page-components/user/quickProfile';
import UserReviews from '../../../../components/page-components/user/reviews/userReviews';
import { useAppSelector } from '../../../../hooks';
import useProfile from '../../../../hooks/userProfile';
import { getRunningOperationPromises, getUser, useBatchMoviesQuery } from '../../../../redux/api';
import { wrapper } from '../../../../redux/store';

interface Props {}

const Reviews: NextPage<Props> = () => {
  const { data } = useProfile();
  const { reviews, profile } = useAppSelector((state) => state.userProfile);

  const movieIds = useMemo(() => {
    if (!reviews) return [];

    return reviews.map((review) => review.tmdbID);
  }, [reviews]);

  const { data: movies } = useBatchMoviesQuery(movieIds, { skip: !movieIds.length });

  return (
    <div className="my-16 px-0 lg:my-0 text-white">
      <QuickProfile />
      {
        !data || !movies ? (
          <div className=" flex w-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="divide-y p-4 md:p-2">
            {reviews.map((review) => (
              <UserReviews
                key={review._id}
                movie={movies?.body[review.tmdbID]}
                profile={profile}
                review={review}
              />
            ))}
          </div>
        )
      }
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id;
    if (typeof id === 'string') {
      store.dispatch(getUser.initiate({ uid: id }));
    }

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  },
);

export default Reviews;
