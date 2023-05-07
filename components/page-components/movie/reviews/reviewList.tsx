import React, { FunctionComponent, useState } from 'react';

import { TmrevReview } from '../../../../models/tmrev';
import { uniqueArray } from '../../../../utils/common';
import ReviewItem from './reviewItem';

interface Props {
  reviews: TmrevReview[]
  // setQuery: React.Dispatch<React.SetStateAction<MovieReviewQuery>>
  // total: number
}

// const dropdownItems = [
//   {
//     query: 'reviewedDate.desc',
//     title: 'Newest',
//   },
//   {
//     query: 'reviewedDate.asc',
//     title: 'Oldest',
//   },
//   {
//     query: 'averagedAdvancedScore.desc',
//     title: 'Highest Rating',
//   },
//   {
//     query: 'averagedAdvancedScore.asc',
//     title: 'Lowest Rating',
//   },
// ];

const MovieReviewList:FunctionComponent<Props> = ({ reviews }:Props) => {
  // const router = useRouter();
  const [open, setOpen] = useState<boolean>(false)



  if (!reviews.length) return null;

  // const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setQuery({
  //     sort_by: e.currentTarget.value as GetMovieReviewSortBy,
  //   });
  // };

  return (
    <div className="space-y-3 text-left bg-black rounded p-2">
      <button className='flex space-x-3 items-center w-full text-left py-1' type="button" onClick={() => setOpen(!open)}>
        <span>
          Reviews
        </span>
        <span className='opacity-50 flex-grow'>
          {reviews.length}
        </span>
        <span className="material-icons-outlined">
          {open ? 'expand_less' : 'expand_more'}
        </span>
      </button>
      {/* <div className="flex space-y-2 lg:items-center flex-col lg:flex-row">
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
      </div> */}
      {uniqueArray(reviews, '_id').map((value) => (
        <ReviewItem key={value._id} compact={!open} review={value} />
      ))}
    </div>
  );
};

export default MovieReviewList;
