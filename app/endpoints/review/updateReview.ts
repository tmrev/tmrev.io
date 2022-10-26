import 'server-only';

import { CreateTmrevReviewQuery, CreateTmrevReviewResponse } from '../../../models/tmrev';

// eslint-disable-next-line max-len
const updateReview = async (payload: CreateTmrevReviewQuery): Promise<CreateTmrevReviewResponse> => {
  const res = await fetch(`${process.env.TMREV_API}/movie/review/${payload.tmdbID}`, {
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      authorization: payload.token || '',
    },
  });

  return res.json();
};

export default updateReview;
