import React, { FunctionComponent } from 'react';

import { TmrevReview } from '../../../models/tmrev';
import ReviewItem from './reviewItem';

interface Props {
  reviews: TmrevReview[]
}

const MovieReviewList:FunctionComponent<Props> = ({ reviews }:Props) => {
  if (!reviews.length) return null;

  return (
    <div className="divide-y space-y-8">
      <h2 className="text-tmrev-alt-yellow font-bold tracking-widest text-2xl">POPULAR REVIEWS</h2>
      {reviews.map((value) => (
        <ReviewItem key={value._id} review={value} />
      ))}
    </div>
  );
};

export default MovieReviewList;
