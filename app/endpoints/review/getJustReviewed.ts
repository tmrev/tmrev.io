import 'server-only';

import { BatchMoviesResponse, JustReviewed } from '../../../models/tmrev/movie';
import batchMovies from '../batch/batchMovies';

const getJustReviewed = async (): Promise<BatchMoviesResponse | undefined> => {
  const justReviewedRes = await fetch(`${process.env.TMREV_API}/movie/just-reviewed`);

  const justReviewedData: JustReviewed = await justReviewedRes.json();

  if (justReviewedData && justReviewedData.success) {
    const data = await batchMovies(justReviewedData.body.movies.map((v) => v.tmdbID));

    return data;
  }

  return undefined;
};

export default getJustReviewed;
