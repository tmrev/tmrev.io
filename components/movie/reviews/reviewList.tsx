import React, { FunctionComponent } from 'react';

import { TmrevReview } from '../../../models/tmrev';
import HeaderText from '../../common/typography/headerText';
import ReviewItem from './reviewItem';

interface Props {
  reviews: TmrevReview[]
}

const MovieReviewList:FunctionComponent<Props> = ({ reviews }:Props) => {
  if (!reviews.length) return null;

  return (
    <div className="divide-y space-y-8">
      <HeaderText headingType="h2">POPULAR REVIEWS</HeaderText>
      {reviews.map((value) => (
        <ReviewItem key={value._id} review={value} />
      ))}
    </div>
  );
};

export default MovieReviewList;
