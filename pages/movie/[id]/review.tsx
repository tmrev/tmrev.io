import clsx from 'clsx';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Button from '@/components/common/Button';
import MetaTags from '@/components/common/MetaTag';
import HeaderText from '@/components/common/typography/headerText';
import CopyLink from '@/components/page-components/movie/[id]/copyLink';
import UserRating from '@/components/page-components/movie/userRating';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { MovieQuery } from '@/models/tmdb';
import { CreateTmrevReviewQuery } from '@/models/tmrev';
import { useAuth } from '@/provider/authUserContext';
import { useAddTmrevReviewMutation, useGetMovieQuery } from '@/redux/api';
import { setClearCurrentReview } from '@/redux/slice/reviewsSlice';
import { setOpenToast, setToastContent } from '@/redux/slice/toastSlice';
import formatDate from '@/utils/formatDate';
import imageUrl from '@/utils/imageUrl';
import { createMediaUrl, parseMediaId } from '@/utils/mediaID';

const ReviewPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const ref = useRef<HTMLDivElement>(null);
  const [moviePublic, setMoviePublic] = useState<boolean>(true);

  const { id } = router.query;

  const payload: MovieQuery = useMemo(() => {
    if (typeof id === 'string') {
      return {
        movie_id: parseMediaId(id),
      };
    }

    return {
      movie_id: 0,
    };
  }, [id]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [ref]);

  const { data } = useGetMovieQuery(payload, { skip: !payload });
  const [addReview] = useAddTmrevReviewMutation();
  const { currentReview } = useAppSelector((state) => state.reviews);

  useEffect(
    () => () => {
      if (typeof id === 'string') {
        localStorage.setItem(
          String(parseMediaId(id as string)),
          JSON.stringify(currentReview),
        );
      }
    },
    [currentReview, id],
  );

  useEffect(
    () => () => {
      dispatch(setClearCurrentReview());
    },
    [],
  );

  const canSubmitReview = () => {
    if (!currentReview) return false;
    const containsNullRatings = Object.values(
      currentReview.advancedScore,
    ).includes(null);

    if (!containsNullRatings) return false;

    return true;
  };

  const averagedAdvancedScore = useMemo(() => {
    if (canSubmitReview() || !currentReview) return null;
    const allValues = Object.values(currentReview.advancedScore);
    const sum = allValues.reduce((prev, curr) => prev + curr, 0);

    return sum / allValues.length;
  }, [currentReview, canSubmitReview()]);

  const submitReview = useCallback(async () => {
    if (
      canSubmitReview()
      || !currentReview
      || !data
      || !user
      || !averagedAdvancedScore
    ) return;

    try {
      const token = await user.getIdToken();

      const newPayload: CreateTmrevReviewQuery = {
        advancedScore: currentReview.advancedScore,
        notes: currentReview.notes,
        public: moviePublic,
        release_date: dayjs(data.body.release_date).format('YYYY-MM-DD'),
        reviewedDate:
          currentReview.reviewedDate || dayjs().format('YYYY-MM-DD'),
        title: data.body.title,
        tmdbID: data.body.id,
        token,
      };

      addReview(newPayload)
        .unwrap()
        .then(() => {
          dispatch(setToastContent('Successfully Reviewed Movie'));
          dispatch(setOpenToast(true));
          router.push(
            `/movie/${createMediaUrl(data.body.id, data.body.title)}`,
          );
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(JSON.stringify(err.data));
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [
    user,
    currentReview,
    data,
    canSubmitReview(),
    averagedAdvancedScore,
    moviePublic,
  ]);

  useEffect(() => {
    canSubmitReview();
  }, [currentReview]);

  if (!data) return null;

  return (
    <div className="dark:bg-black bg-white relative flex flex-col w-full">
      <MetaTags
        description={`Reviewing ${data.body.title}`}
        image={imageUrl(data.body.poster_path || '', 400, true)}
        largeImage={imageUrl(data.body.backdrop_path || '')}
        title={`${data.body.title} | Review`}
        url={createMediaUrl(data.body.id, data.body.title)}
      />
      <div className="relative w-full h-96 lg:h-[500px]">
        <Image
          fill
          priority
          alt={`${data.body.title} backdrop`}
          className='object-cover'
          src={imageUrl(data.body.backdrop_path)}
        />
        <div className=" absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent dark:to-black to-white h-full w-full" />
      </div>
      <div className="px-4 mb-6 lg:px-8 mt-0 lg:-mt-16 z-30">
        <div
          className={clsx(
            'dark:bg-black bg-white p-0 md:p-8 flex',
            'lg:rounded',
          )}
        >
          <div className="flex dark:text-white text-black">
            <div className="hidden lg:flex lg:flex-col mr-8 space-y-4">
              <Image
                priority
                alt={`${data.body.title} poster`}
                className="rounded aspect-[2/3]"
                height={500}
                objectFit="cover"
                src={imageUrl(data.body.poster_path || '', 400, true)}
                width={350}
              />
              <Button
                disabled={canSubmitReview()}
                variant="primary"
                onClick={submitReview}
              >
                Submit Review
              </Button>
              <Button
                variant="secondary"
                onClick={() => setMoviePublic(!moviePublic)}
              >
                {moviePublic ? 'Make Private' : 'Make Public'}
              </Button>
            </div>
            <div className="flex flex-col space-y-3">
              <div className="max-w-sm md:max-w-lg 2xl:max-w-5xl">
                <span className="flex items-center space-x-2">
                  <HeaderText headingType="p">movie</HeaderText>
                  <CopyLink link={`https://tmrev.io${router.asPath}`} />
                </span>
                <h1 className="flex flex-wrap items-center text-3xl lg:text-6xl font-semibold">
                  <span className="mr-2">{data.body.title}</span>
                  <span className="text-lg lg:text-2xl dark:opacity-75 opacity-50">
                    (
                    {formatDate(data.body.release_date)}
                    )
                  </span>
                </h1>
                <p className="mt-8">{data.body.overview}</p>
              </div>
              <div
                ref={ref}
                className="!space-y-16 !mt-16 md:!mt-[7rem]"
                id="review"
              >
                <UserRating />
                <div className="lg:hidden mt-8">
                  <Button
                    className="w-full"
                    disabled={canSubmitReview()}
                    variant="primary"
                    onClick={submitReview}
                  >
                    Submit Review
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
