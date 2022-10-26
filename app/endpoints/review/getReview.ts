import 'server-only';

import { ReviewResponse } from '../../../models/tmrev/movie';

const getReview = async (id: string, token: string): Promise<ReviewResponse> => {
  const res = await fetch(`${process.env.TMREV_API}/movie/review/${id}`, {
    headers: {
      authorization: token,
    },
  });

  return res.json();
};

export default getReview;
