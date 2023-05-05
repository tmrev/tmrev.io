import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FunctionComponent } from 'react';

import { GetMovieReviewSortBy, MovieReviewQuery } from '../../../../models/tmdb/movie';
import { TmrevReview } from '../../../../models/tmrev';
import { uniqueArray } from '../../../../utils/common';
import HeaderText from '../../../common/typography/headerText';
import ReviewItem from './reviewItem';

interface Props {
  reviews: TmrevReview[]
  setQuery: React.Dispatch<React.SetStateAction<MovieReviewQuery>>
  total: number
}

const dropdownItems = [
  {
    query: 'reviewedDate.desc',
    title: 'Newest',
  },
  {
    query: 'reviewedDate.asc',
    title: 'Oldest',
  },
  {
    query: 'averagedAdvancedScore.desc',
    title: 'Highest Rating',
  },
  {
    query: 'averagedAdvancedScore.asc',
    title: 'Lowest Rating',
  },
];

const MovieReviewList:FunctionComponent<Props> = ({ reviews, setQuery, total }:Props) => {
  const router = useRouter();

  if (!reviews.length) return null;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery({
      sort_by: e.currentTarget.value as GetMovieReviewSortBy,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex space-y-2 lg:items-center flex-col lg:flex-row">
        <HeaderText headingType="h2">POPULAR REVIEWS</HeaderText>
        <div className="flex-grow" />
        <div className="flex flex-col space-y-1">
          <label className="text-sm opacity-75" htmlFor="review-sort">Sort reviews</label>
          <select className=" bg-tmrev-gray-dark rounded p-2" id="review-sort" onChange={handleChange}>
            {dropdownItems.map((d) => (
              <option key={d.query} value={d.query}>{d.title}</option>
            ))}
          </select>
        </div>
      </div>
      {uniqueArray(reviews, '_id').map((value) => (
        <ReviewItem key={value._id} review={value} />
      ))}
      <div className="my-8 py-8">
        {total > reviews.length && (
          <Link passHref href={`${router.asPath}/all-reviews`}>
            <a className=" bg-tmrev-gray-dark p-4
            rounded hover:bg-tmrev-gray-light"
            >
              View All Reviews
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MovieReviewList;
