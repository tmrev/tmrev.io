import 'server-only';

import { BatchMoviesResponse } from '../../../models/tmrev/movie';

const batchMovies = async (ids: number[]): Promise<BatchMoviesResponse> => {
  const res = await fetch(`${process.env.TMREV_API}/movie/batch`, {
    body: JSON.stringify({
      movieId: ids,
    }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  //   const test = await res.json().then((body) => body);

  //   console.log(test, 'zzzzzzzzzz');

  return res.json();
};

export default batchMovies;
