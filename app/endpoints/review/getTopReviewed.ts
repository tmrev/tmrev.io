import 'server-only';

import { BatchMoviesResponse, TopReviewed } from '../../../models/tmrev/movie';
import batchMovies from '../batch/batchMovies';

const getTopReviewed = async (): Promise<BatchMoviesResponse | undefined> => {
  const topIdsRes = await fetch(`${process.env.TMREV_API}/movie/top-reviewed`, {
    next: {
      revalidate: 10,
    },
  });

  const topIdsData: TopReviewed = await topIdsRes.json();

  if (topIdsData && topIdsData.success) {
    const data = await batchMovies(topIdsData.body.map((v) => v._id));

    return data;
  }

  return undefined;
};

export default getTopReviewed;
