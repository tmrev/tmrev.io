import 'server-only';

import { BatchMoviesResponse, JustReviewed } from '../../../models/tmrev/movie';
import batchMovies from '../batch/batchMovies';

interface Response {
  batchMovieData: BatchMoviesResponse
  data: JustReviewed
  count: number
}

const getJustReviewed = async (): Promise<Response | undefined> => {
  const justReviewedRes = await fetch(`${process.env.TMREV_API}/movie/just-reviewed`);

  const justReviewedData: JustReviewed = await justReviewedRes.json();

  if (justReviewedData && justReviewedData.success) {
    const data = await batchMovies(justReviewedData.body.movies.map((v) => v.tmdbID));

    return {
      batchMovieData: data,
      count: justReviewedData.body.count,
      data: justReviewedData,
    };
  }

  return undefined;
};

export default getJustReviewed;
